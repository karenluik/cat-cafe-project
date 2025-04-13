import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { PackageService } from '../../services/package.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../common/interfaces';
import { Package } from '../../common/interfaces';
import {BookingFormComponent} from "../booking-form/booking-form.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  standalone: true,
  imports: [
    BookingFormComponent,
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
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
      next: (data) => this.bookings = data,
      error: (err) => console.error('Error loading bookings', err)
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
}
