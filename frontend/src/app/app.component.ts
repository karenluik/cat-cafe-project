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
  showRickroll = false;

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
      this.showRickroll = true;
    }
  }

  closeRickroll() {
    this.showRickroll = false;
  }
}
