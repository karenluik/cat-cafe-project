import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { PackagesModule } from './packages/packages.module';
import { PrismaService } from '../prisma/prisma.service';
import {AppService} from "./app.service";
import {CatsModule} from "./cats/cats.module";
import {AuthService} from "./auth/auth.service";
import {UsersService} from "./users/users.service";
import {UsersController} from "./users/users.controller";
import {AuthController} from "./auth/auth.controller";
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    BookingsModule,
    PackagesModule,
    CatsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'frontend/dist/cat-cafe/browser'),
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [AppService,PrismaService, AuthService, UsersService],
})
export class AppModule {}