import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}
}
