import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as PrismaClientCats } from '../prisma/generated/db_cats';
import { PrismaClient as PrismaClientCafe } from '../prisma/generated/db_cafe';
import * as path from 'path';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    dbCats: PrismaClientCats;
    dbCafe: PrismaClientCafe;

    constructor() {
        const generatedPath = path.resolve(__dirname, '../../prisma/generated');

        this.dbCats = new (require(`${generatedPath}/db_cats`).PrismaClient)();
        this.dbCafe = new (require(`${generatedPath}/db_cafe`).PrismaClient)();
    }

    async onModuleInit() {
        await this.dbCats.$connect();
        await this.dbCafe.$connect();
    }

    async onModuleDestroy() {
        await this.dbCats.$disconnect();
        await this.dbCafe.$disconnect();
    }
}
