import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private httpClient: HttpClient,
              private auth: AuthService) {}

  title = 'pokerui';
  events = null;

  isNavbarCollapsed = true;

  ngOnInit() {
    this.auth.login();
  }

}
