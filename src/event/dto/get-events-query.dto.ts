import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { SortOrder } from 'src/types/enums/sort-order.enum';

export class GetEventsQueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: EventStatus })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Sort by field (e.g. name, startDate, endDate)',
    enum: ['name', 'startDate', 'endDate', 'location'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    description: 'Sort order (asc or desc)',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
