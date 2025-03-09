import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CatsComponent} from "./components/cats/cats.component";
import {BookingComponent} from "./components/booking/booking.component";

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'cats',
    component:CatsComponent
  },
  {
    path:'booking',
    component:BookingComponent
  }
];
