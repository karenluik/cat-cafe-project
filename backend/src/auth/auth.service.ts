import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto.username, loginUserDto.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            id: user.id,
        };
    }


    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.usersService.createUser({
            ...createUserDto,
            password: hashedPassword,
        });
    }
}