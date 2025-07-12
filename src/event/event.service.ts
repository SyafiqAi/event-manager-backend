import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { contains } from 'class-validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  create(dto: CreateEventDto) {
    return this.prismaService.event.create({ data: dto });
  }

  updatePoster(id: number, posterUrl: string) {
    return this.prismaService.event.update({
      where: { id },
      data: { posterUrl },
    });
  }

  async findAll(query: GetEventsQueryDto) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {
      status: query.status,
      startDate: query.fromDate ? { gte: query.fromDate } : undefined,
      endDate: query.toDate ? { lte: query.toDate } : undefined,
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { location: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };

    const orderBy: Prisma.Enumerable<Prisma.EventOrderByWithRelationInput> =
      query.sortBy
        ? { [query.sortBy]: query.sortOrder || 'asc' }
        : { startDate: 'asc' }; // default sort

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.event.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prismaService.event.count({
        where,
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prismaService.event.findUnique({ where: { id } });
  }

  update(id: number, dto: Partial<CreateEventDto>) {
    return this.prismaService.event.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prismaService.event.delete({ where: { id } });
  }
}
