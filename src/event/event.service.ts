import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor (private readonly prismaService: PrismaService) {}
  create(@Body() dto: CreateEventDto) {
    return undefined;
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(@Param('id') id: number) {
    return undefined;
  }

  update(@Param('id') id: number, @Body() dto: Partial<CreateEventDto>) {
    return undefined;
  }

  remove(@Param('id') id: number) {
    return undefined;
  }
}
