import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.router.navigate(['/login']);
      },
      error: (err) => this.errorMessage = err.error.message || 'Registration failed, please try again.'
    });
  }
}
