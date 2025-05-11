import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOneById(id: number) {
        return this.prisma.dbCafe.users.findUnique({
            where: { id },
        });
    }

    async findOneByUsername(username: string) {
        return this.prisma.dbCafe.users.findUnique({
            where: { username },
        });
    }

    async createUser(data: { name: string; username: string; email: string; password: string }) {
        try {

            return await this.prisma.dbCafe.users.create({ data });
        } catch (error) {
            console.error('Create user error:', error);
            if (
              error instanceof PrismaClientKnownRequestError &&
              error.code === 'P2002'
            ) {
                // Unique constraint failed
                const target = (error.meta?.target as string[]) || [];
                if (target.includes('username')) {
                    throw new ConflictException('Username already taken');
                }
                if (target.includes('email')) {
                    throw new ConflictException('Email already registered');
                }
                throw new ConflictException('Username or email already in use');
            }

            throw error;
        }

    }
}