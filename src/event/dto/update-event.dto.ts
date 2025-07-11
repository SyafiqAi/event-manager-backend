import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EventStatus } from '@prisma/client';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}
