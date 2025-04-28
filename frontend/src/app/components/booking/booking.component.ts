import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { PackageService } from '../../services/package.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../common/interfaces';
import { Package } from '../../common/interfaces';
import { BookingFormComponent } from "../booking-form/booking-form.component";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPenToSquare, faSmile, faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  standalone: true,
  imports: [
    BookingFormComponent,
    DatePipe,
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  displayBookings: any[] = []; // New property for formatted bookings
  packages: Package[] = [];
  showForm = false;
  currentBooking?: Booking;

  constructor(
    private bookingService: BookingService,
    private packageService: PackageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadPackages();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        const currentUserId = this.authService.getUserId();
        console.log('Current User ID:', currentUserId);
        console.log('All fetched bookings:', data);

        this.bookings = data.filter(booking => booking.user_id === currentUserId);
        console.log('Filtered bookings:', this.bookings);

        this.displayBookings = this.formatBookingsForDisplay(this.bookings);
      },
      error: (err) => console.error('Error loading bookings', err)
    });
  }





  private formatBookingsForDisplay(bookings: Booking[]): any[] {
    return bookings.map(booking => {
      // Log raw data for debugging
      console.log('Raw Booking Data:', booking);

      // Combine booking_date (YYYY-MM-DD) and booking_time (HH:MM) correctly
      const dateString = `${booking.booking_date.split('T')[0]}T${booking.booking_time}:00`;  // Add seconds

      console.log('Constructed date string:', dateString); // Check the constructed date string

      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString); // If invalid date, log error
      }

      return {
        ...booking,
        display_date: date.toLocaleDateString('en-US'),  // Display formatted date
        display_time: date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false  // Use 24-hour format
        }) // Display formatted time in 24-hour format
      };
    });
  }



  // Rest of your existing methods remain unchanged...
  loadPackages(): void {
    this.packageService.getPackages().subscribe({
      next: (data) => this.packages = data,
      error: (err) => console.error('Error loading packages', err)
    });
  }

  showAddForm(): void {
    this.currentBooking = undefined;
    this.showForm = true;
  }

  showEditForm(booking: Booking): void {
    this.currentBooking = { ...booking };  // Make sure you copy the booking data
    this.showForm = true;
  }

  onFormSubmit(newBooking: Booking): void {
    this.showForm = false;

    const user = this.authService.getUser();
    const packageData = this.packages.find(p => p.id === newBooking.package_id);

    // Check if we are updating an existing booking
    if (newBooking.id) {
      // UPDATE existing booking
      this.bookingService.updateBooking(newBooking.id, newBooking).subscribe({
        next: () => {
          this.loadBookings(); // Reload bookings after update
        },
        error: (err) => console.error('Failed to update booking', err)
      });
    } else {
      // CREATE new booking
      const fullBooking = {
        ...newBooking,
        user: user,
        package: packageData
      };

      // Adding new booking to local state
      this.bookings.push(fullBooking);
      this.displayBookings.push(this.formatSingleBookingForDisplay(fullBooking));
      this.loadBookings();
    }
    this.loadBookings();
  }



  private formatSingleBookingForDisplay(booking: Booking): any {
    const date = new Date(booking.booking_date);
    return {
      ...booking,
      display_date: date.toLocaleDateString('en-US'),
      display_time: booking.booking_time // directly use booking_time now
    };
  }


  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => this.loadBookings(),
        error: (err) => console.error('Error deleting booking', err)
      });
    }
  }

  getPackageName(packageId: number): string {
    const pkg = this.packages.find(p => p.id === packageId);
    return pkg?.name || 'Unknown Package';
  }

  getPackagePrice(packageId: number): number {
    const pkg = this.packages.find(p => p.id === packageId);
    return pkg?.price || 0;
  }


  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrashCan = faTrashCan;
}
