import {IsDateString, IsInt, IsString, Matches} from "class-validator";

export class CreateBookingDto {
    @IsInt()
    package_id: number;

    @IsDateString()
    booking_date: string;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    booking_time: string;
}
