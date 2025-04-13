import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'cat_cafe_token';

  constructor(private http: HttpClient, private router: Router) {}

  // Register method to create a new user
  register(user: { name: string, username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user); // Post to the register endpoint
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response?.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
