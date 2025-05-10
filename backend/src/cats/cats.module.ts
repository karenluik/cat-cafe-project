import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import {PrismaService} from "../../prisma/prisma.service";

@Module({
  providers: [CatsService, PrismaService],
  controllers: [CatsController]
})
export class CatsModule {}
