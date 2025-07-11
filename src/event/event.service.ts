import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  create(@Body() dto: CreateEventDto) {
    return undefined;
  }

  findAll() {
    return undefined;
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
