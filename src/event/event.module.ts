import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [PrismaModule]
})
export class EventModule {}
