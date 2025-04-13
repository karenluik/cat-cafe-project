import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CatsComponent} from "./components/cats/cats.component";
import {BookingComponent} from "./components/booking/booking.component";
import {LoginComponent} from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guards';
import {RegistrationComponent} from "./components/registration/registration.component";

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
    path:'bookings',
    component:BookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  }
];
