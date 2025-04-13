import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/bookings']),
      error: () => this.errorMessage = 'Invalid username or password'
    });
  }
}
