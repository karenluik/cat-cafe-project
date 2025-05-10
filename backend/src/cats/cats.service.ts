import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CatsService {
    constructor(private prisma: PrismaService) {}


    async findAll() {
        try {
            return await this.prisma.dbCats.cats.findMany();
        } catch (error) {
            console.error('Error fetching cats:', error);
            throw new Error('Failed to fetch cats');
        }
    }


}
