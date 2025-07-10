import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Syafiq Aiman' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: Role, example: Role.User })
  @IsEnum(Role)
  role: Role;
}
