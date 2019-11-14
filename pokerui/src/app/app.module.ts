import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { GraphQLModule } from './graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventoverviewComponent } from './eventoverview/eventoverview.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { PlayerdetailsComponent } from './playerdetails/playerdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventlistComponent,
    EventoverviewComponent,
    EventdetailsComponent,
    PlayerdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    GraphQLModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
