import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Booking } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/bookings';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking, {
      headers: this.getHeaders()
    });
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateBooking(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking, {
      headers: this.getHeaders()
    });
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getAvailableSlots(date: string): string[] {
    // Hardcoded available time slots
    const allSlots = ['10:00', '12:00', '14:00', '16:00', '18:00'];
    return allSlots;
  }
}
