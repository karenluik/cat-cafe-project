import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kat-cafe';
  private konamiCode: string[] = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  private inputSequence: string[] = [];

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.inputSequence.push(event.key);
    if (this.inputSequence.length > this.konamiCode.length) {
      this.inputSequence.shift();
    }

    if (this.inputSequence.join('') === this.konamiCode.join('')) {
      this.triggerRickroll();
    }
  }

  triggerRickroll() {
    const video = document.createElement('iframe');
    video.width = '0';
    video.height = '0';
    video.style.display = 'none';
    video.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    video.allow = 'autoplay';

    document.body.appendChild(video);

    alert('🎶 Never gonna give you up... 🎶');
  }
}
