import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Booking, CreateBookingDto} from '../../common/interfaces';
import { Package } from '../../common/interfaces';
import { BookingService } from '../../services/booking.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnChanges {
  @Input() packages: Package[] = [];
  @Input() booking: any;
  @Output() submit = new EventEmitter<Booking>();
  @Output() cancel = new EventEmitter<void>();

  model: Partial<Booking> = {
    id: undefined,
    package_id: undefined,
    booking_date: '',
    booking_time: ''
  };
  availableSlots: string[] = [];
  selectedDate: string = '';

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['booking'] && this.booking) {

      this.model = { ...this.booking };


      const rawDate = new Date(this.booking.booking_date ?? '');
      if (!isNaN(rawDate.getTime())) {
        const yyyy = rawDate.getFullYear();
        const mm = String(rawDate.getMonth() + 1).padStart(2, '0');
        const dd = String(rawDate.getDate()).padStart(2, '0');
        this.model.booking_date = `${yyyy}-${mm}-${dd}`;
      } else {
        this.model.booking_date = '';
      }


      this.selectedDate = this.model.booking_date;
      this.availableSlots = this.bookingService.getAvailableSlots(this.selectedDate);
    }
  }


  onDateChange(date: string) {
    this.selectedDate = date;
    this.availableSlots = this.bookingService.getAvailableSlots(date);
  }

  onSubmit() {
    if (this.model.package_id && this.model.booking_date && this.model.booking_time) {
      const user = this.authService.getUser();
      const user_id = user?.id;

      let bookingData: CreateBookingDto = {
        package_id: Number(this.model.package_id),
        booking_date: this.model.booking_date,
        booking_time: this.model.booking_time || '',
        user_id: user_id as number
      };


      if (this.model.id) {

        const updateData: Partial<CreateBookingDto> = {
          package_id: Number(this.model.package_id),
          booking_date: this.model.booking_date,
          booking_time: this.model.booking_time || ''
        };

        this.bookingService.updateBooking(this.model.id, updateData).subscribe({
          next: (updatedBooking) => {
            console.log('Booking updated successfully:', updatedBooking);
            this.submit.emit(updatedBooking);
          },
          error: (err) => {
            console.error('Failed to update booking', err);
          }
        });
      } else {

        this.bookingService.createBooking(bookingData).subscribe({
          next: (createdBooking) => {
            console.log('Booking created successfully:', createdBooking);
            this.submit.emit(createdBooking);
          },
          error: (err) => {
            console.error('Failed to create booking', err);
          }
        });
      }
    }
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}



