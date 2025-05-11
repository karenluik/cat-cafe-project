import {RouterLink} from "@angular/router";
import { Component, HostListener, ElementRef } from '@angular/core';
import { NgIf, ViewportScroller } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private el: ElementRef,private viewportScroller: ViewportScroller,public authService: AuthService) {}

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
}



