import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteEventDto {
  @ApiProperty({ description: 'Your password for confirmation' })
  @IsString()
  password: string;
}
