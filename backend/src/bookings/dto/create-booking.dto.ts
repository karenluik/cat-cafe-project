import {IsDateString, IsInt, IsString, Matches} from "class-validator";

export class CreateBookingDto {
    @IsInt()
    package_id: number;

    @IsDateString()
    booking_date: string; // Date in YYYY-MM-DD format

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/) // Ensures HH:MM format
    booking_time: string; // Time in HH:MM format
}
