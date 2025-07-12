import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { DeleteEventDto } from './dto/delete-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest } from 'src/types/auth-request.interface';
import { Roles } from 'src/auth/roleGuard/role.decorator';
import { RolesGuard } from 'src/auth/roleGuard/role.guard';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateEventDto })
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Post(':id/poster')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadPoster(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const posterUrl = `/uploads/posters/${file.filename}`;
    await this.eventService.updatePoster(+id, posterUrl);
    return { message: 'Poster uploaded successfully', posterUrl };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'User')
  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: GetEventsQueryDto) {
    return this.eventService.findAll(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'User')
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Delete(':id')
  async remove(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: DeleteEventDto,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { id: req.user.sub },
    });

    if(!user) {
      throw new UnauthorizedException();
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.eventService.remove(+id);
  }
}
