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
  displayBookings: any[] = [];
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
      console.log('Raw Booking Data:', booking);
      const dateString = `${booking.booking_date.split('T')[0]}T${booking.booking_time}:00`;

      console.log('Constructed date string:', dateString);

      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
      }

      return {
        ...booking,
        display_date: date.toLocaleDateString('en-US'),
        display_time: date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      };
    });
  }


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
    this.currentBooking = { ...booking };
    this.showForm = true;
  }

  onFormSubmit(newBooking: Booking): void {
    this.showForm = false;

    const user = this.authService.getUser();
    const packageData = this.packages.find(p => p.id === newBooking.package_id);

    if (newBooking.id) {
      this.bookingService.updateBooking(newBooking.id, newBooking).subscribe({
        next: () => {
          this.loadBookings();
        },
        error: (err) => console.error('Failed to update booking', err)
      });
    } else {
      const fullBooking = {
        ...newBooking,
        user: user,
        package: packageData
      };

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
      display_time: booking.booking_time
    };
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


  showConfirmModal = false;
  bookingToDelete: number | null = null;
  showDeleteAlert = false;

  promptDelete(id: number): void {
    this.bookingToDelete = id;
    this.showConfirmModal = true;
  }

  cancelDelete(): void {
    this.bookingToDelete = null;
    this.showConfirmModal = false;
  }

  confirmDelete(): void {
    if (this.bookingToDelete !== null) {
      this.bookingService.deleteBooking(this.bookingToDelete).subscribe(() => {
        this.loadBookings();
        this.showDeleteAlert = true;
        this.showConfirmModal = false;
        this.bookingToDelete = null;

        setTimeout(() => {
          this.showDeleteAlert = false;
        }, 3000);
      });
    }
  }
}

