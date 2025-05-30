/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {CreateBookingDto} from "./dto/create-booking.dto";
import {UpdateBookingDto} from "./dto/update-booking.dto";


@Injectable()
export class BookingsService {
    constructor(private prisma: PrismaService) {}


    async create(bookingData: Omit<CreateBookingDto, 'user_id'> & { user_id: number }) {
        console.log('Final Booking Data:', bookingData);


        const bookingDate = new Date(bookingData.booking_date);


        const timeParts = bookingData.booking_time.split(':');
        bookingDate.setHours(parseInt(timeParts[0]));
        bookingDate.setMinutes(parseInt(timeParts[1]));


        return this.prisma.dbCafe.bookings.create({
            data: {
                user_id: bookingData.user_id,
                package_id: bookingData.package_id,
                booking_date: bookingDate,
                booking_time: bookingData.booking_time
            }
        });
    }


    async findAll() {
        return this.prisma.dbCafe.bookings.findMany({
            include: { user: true, package: true },
        });
    }

    async findOne(id: number) {
        return this.prisma.dbCafe.bookings.findUnique({
            where: { id },
            include: { user: true, package: true },
        });
    }

    async update(bookingId: number, updateBookingDto: UpdateBookingDto) {
        const updatedBookingData: any = {};

        // Only update the fields that are provided
        if (updateBookingDto.package_id) {
            updatedBookingData.package_id = updateBookingDto.package_id;
        }

        if (updateBookingDto.booking_date) {
            updatedBookingData.booking_date = new Date(updateBookingDto.booking_date);
        }

        if (updateBookingDto.booking_time) {
            updatedBookingData.booking_time = updateBookingDto.booking_time;
        }

        return this.prisma.dbCafe.bookings.update({
            where: { id: bookingId },
            data: updatedBookingData,
        });
    }

    async remove(id: number) {
        return this.prisma.dbCafe.bookings.delete({
            where: { id },
        });
    }
}