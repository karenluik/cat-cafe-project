import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  id: number;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'cat_cafe_token';
  private userIdKey = 'cat_cafe_user_id';

  constructor(private http: HttpClient, private router: Router) {}



  register(user: { name: string, username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        console.log('Login response:', response);
        if (response?.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);

          if (response.id !== undefined) {
            localStorage.setItem(this.userIdKey, response.id.toString());
          }
        }
      })
    );
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    if (userId === null) return null;
    const id = parseInt(userId, 10);
    return isNaN(id) ? null : id;
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return {
        id: payload.sub,   // Use "sub" — that's the standard claim for user id
        username: payload.username,
        name: payload.name ?? null,
        email: payload.email ?? null
      };
    } catch (error) {
      console.error('Failed to parse JWT:', error);
      return null;
    }
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
