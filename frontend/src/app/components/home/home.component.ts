import {RouterLink} from "@angular/router";
import { Component, HostListener, ElementRef } from '@angular/core';
import { NgIf, ViewportScroller } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private el: ElementRef, private viewportScroller: ViewportScroller, public authService: AuthService,private http: HttpClient) {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const animatedDiv = this.el.nativeElement.querySelector('#animatedDiv');
    if (this.isInViewport(animatedDiv)) {
      animatedDiv.classList.add('animate');
    }
  }


  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  scrollTo(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  };

  showContactModal = false;
  contact = {
    name: '',
    email: '',
    message: ''
  };
  successMessage = '';
  errorMessage = '';

  openContactModal() {
    this.showContactModal = true;
    this.clearMessages();
  }

  closeContactModal() {
    this.showContactModal = false;
    this.clearMessages();
    this.resetForm();
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  resetForm() {
    this.contact = { name: '', email: '', message: '' };
  }

  submitContact(form: any) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('name', this.contact.name);
      formData.append('email', this.contact.email);
      formData.append('message', this.contact.message);

      this.http.post('https://getform.io/f/allljdla', formData, { responseType: 'text' }).subscribe({
        next: () => {
          this.successMessage = "Thanks for reaching out! We'll get back to you soon.";
          this.errorMessage = '';
          form.resetForm();
          this.contact = { name: '', email: '', message: '' };

          setTimeout(() => {
            this.closeContactModal();
          }, 1500);
        },
        error: (err) => {
          this.errorMessage = 'There was a problem sending your message. Please try again later.';
          this.successMessage = '';
          console.error('Form submission error:', err);
        }
      });

    } else {
      this.errorMessage = 'Please fill out the form correctly before sending.';
      this.successMessage = '';
    }
  }



}
