import {IsOptional, IsString, IsDateString, IsInt, Matches} from 'class-validator';

export class UpdateBookingDto {
    @IsOptional()
    @IsInt()
    package_id: number;

    @IsOptional()
    @IsDateString()
    booking_date: string;

    @IsOptional()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    booking_time: string;
}
