import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PackagesService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.dbCafe.packages.findMany();
    }

    async findOne(id: number) {
        return this.prisma.dbCafe.packages.findUnique({
            where: { id },
        });
    }
}