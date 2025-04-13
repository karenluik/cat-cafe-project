import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../common/interfaces';
import { Package } from '../../common/interfaces';
import { BookingService } from '../../services/booking.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

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
    packageId: undefined,
    bookingDate: '',
    bookingTime: ''
  };
  availableSlots: string[] = [];
  selectedDate: string = '';

  constructor(private bookingService: BookingService) {
    if (this.booking) {
      this.model = { ...this.booking };
    }
  }

  onDateChange(date: string) {
    this.selectedDate = date;
    this.availableSlots = this.bookingService.getAvailableSlots(date);
  }

  onSubmit() {
    if (this.model.packageId && this.model.bookingDate && this.model.bookingTime) {
      const bookingData: Booking = {
        userId: 1, // In real app, get from auth service
        packageId: this.model.packageId,
        bookingDate: this.model.bookingDate,
        bookingTime: this.model.bookingTime
      };

// Here you would call the service to create/update booking
      this.submit.emit();
    }
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
