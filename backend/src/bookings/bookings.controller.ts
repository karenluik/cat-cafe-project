import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {User} from "../decorators/user.decorator";
import {JwtPayload} from "../auth/jwt/jwt.strategy";

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post()
    create(
        @User() user: { id: number },  // user_id fetched from the JWT token
        @Body() createBookingDto: Omit<CreateBookingDto, 'user_id'>  // Exclude user_id
    ) {
        console.log('Authenticated User:', user);
        return this.bookingsService.create({
            ...createBookingDto,
            user_id: user.id  // Add user_id to the booking data
        });
    }


    @Get()
    findAll() {
        return this.bookingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingsService.update(+id, updateBookingDto);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookingsService.remove(+id);
    }
}