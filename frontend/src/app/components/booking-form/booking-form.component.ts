import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../common/interfaces';
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
export class BookingFormComponent {
  @Input() packages: Package[] = [];
  @Input() booking: any;
  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  model: Partial<Booking> = {
    package_id: undefined,
    booking_date: '',
    booking_time: ''
  };
  availableSlots: string[] = [];
  selectedDate: string = '';

  constructor(private bookingService: BookingService, private authService: AuthService) {
    if (this.booking) {
      this.model = { ...this.booking };
    }
  }

  onDateChange(date: string) {
    this.selectedDate = date;
    this.availableSlots = this.bookingService.getAvailableSlots(date);
  }

  onSubmit() {
    if (this.model.package_id && this.model.booking_date && this.model.booking_time) {
      const bookingData : Booking = {
        user_id: this.authService.getUserId() || 0  ,
        package_id: Number(this.model.package_id!),
        booking_date: this.model.booking_date,
        booking_time: this.model.booking_time || ''
      };
      console.log('Sending booking data:', bookingData);

      this.bookingService.createBooking(bookingData).subscribe({
        next: () => {
          this.submit.emit();
        },
        error: (err) => {
          console.error('Failed to create booking', err);
        }
      });
    }
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
