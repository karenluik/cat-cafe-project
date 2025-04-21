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
        this.bookings = data; // Keep original data
        this.displayBookings = this.formatBookingsForDisplay(data); // Create formatted version
      },
      error: (err) => console.error('Error loading bookings', err)
    });
  }

  // New formatting function
  private formatBookingsForDisplay(bookings: Booking[]): any[] {
    return bookings.map(booking => {
      const date = new Date(booking.booking_date);
      return {
        ...booking,
        display_date: date.toLocaleDateString('en-US'), // e.g. "4/14/2025"
        display_time: date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) // e.g. "04:00 PM"
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
    this.currentBooking = { ...booking };
    this.showForm = true;
  }

  onFormSubmit(): void {
    this.showForm = false;
    this.loadBookings();
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
