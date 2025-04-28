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
      this.model = { ...this.booking };  // Update the form model when booking input changes
      this.selectedDate = this.booking.booking_date;
      this.availableSlots = this.bookingService.getAvailableSlots(this.selectedDate);  // Update available slots for the date
    }
  }


  onDateChange(date: string) {
    this.selectedDate = date;
    this.availableSlots = this.bookingService.getAvailableSlots(date);
  }

  onSubmit() {
    if (this.model.package_id && this.model.booking_date && this.model.booking_time) {
      const user = this.authService.getUser();  // Get the logged-in user info from auth service
      const user_id = user?.id;  // Extract the user_id from the user object

      // Prepare the data to send to the backend
      let bookingData: CreateBookingDto = {
        package_id: Number(this.model.package_id),
        booking_date: this.model.booking_date,
        booking_time: this.model.booking_time || '',  // Ensure booking_time is a string
        user_id: user_id as number // Ensure user_id is set correctly as a number
      };

      // Check if we are updating an existing booking
      if (this.model.id) {
        // For updating an existing booking: exclude user_id from update request
        const updateData: Partial<CreateBookingDto> = {
          package_id: Number(this.model.package_id),
          booking_date: this.model.booking_date,
          booking_time: this.model.booking_time || ''  // Ensure booking_time is a string
        };

        this.bookingService.updateBooking(this.model.id, updateData).subscribe({
          next: (updatedBooking) => {
            console.log('Booking updated successfully:', updatedBooking);
            this.submit.emit(updatedBooking); // Emit the updated booking
          },
          error: (err) => {
            console.error('Failed to update booking', err);
          }
        });
      } else {
        // For creating a new booking: include user_id in the request
        this.bookingService.createBooking(bookingData).subscribe({
          next: (createdBooking) => {
            console.log('Booking created successfully:', createdBooking);
            this.submit.emit(createdBooking); // Emit the newly created booking
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



