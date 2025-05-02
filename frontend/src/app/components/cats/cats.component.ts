import {Component, inject} from '@angular/core';
import {CatsService} from "../../services/cats.service";
import {Cats} from "../../common/interfaces";
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [
    NgStyle,
  ],
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.css'
})
export class CatsComponent {
private readonly catsService : CatsService = inject(CatsService);

cats : Cats[] = [];


constructor() {
  this.loadCats();
}

  private loadCats() {
    this.catsService.getCats().subscribe({
      next: value => {
        this.cats = value;
      },
      error : err => {
        console.error(err.message);
      },
      complete : () => {
        console.log('cats loaded');
      }
    })
  }





}
