import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventlistComponent} from './eventlist/eventlist.component';
import {NavbarComponent} from './navbar/navbar.component';
import {EventdetailsComponent} from './eventdetails/eventdetails.component';
import {PlayerdetailsComponent} from './playerdetails/playerdetails.component';
import {PlayerlistComponent} from "./playerlist/playerlist.component";


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventlistComponent },
  { path: 'events/:id', component: EventdetailsComponent },
  { path: 'profiles/:id', component: PlayerdetailsComponent },
  { path: 'profiles', component: PlayerlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
