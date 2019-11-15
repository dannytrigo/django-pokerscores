import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authSvc: AuthService) { }

  faUser = faUser;
  isNavbarCollapsed = true;

  ngOnInit() {
    console.log(this.authSvc.isUserLoggedIn)
  }

}
