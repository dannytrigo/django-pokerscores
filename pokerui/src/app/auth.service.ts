import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  isUserLoggedIn = false;
  username: string;
  nickname: string;
  profileId: number;
  isSuperuser: boolean;

  login() {
    this.http.get('/views/login/', {observe: 'response'}).subscribe((data: any) => {
      console.log(data);
      if ( data.status === 401) {
        console.log('Not authenticated');
        this.isUserLoggedIn = false;
        this.router.navigateByUrl('login');
      } else if (data.status === 200) {
        console.log('Authenticated');
        this.username = (data.body as any).username;
        this.nickname = (data.body as any).nickname;
        this.profileId = (data.body as any).profileId;
        this.isSuperuser = (data.body as any).is_superuser;
        console.log(data);
        console.log(this.isSuperuser);
        this.isUserLoggedIn = true;
        // this.router.navigateByUrl('events');
      }
    });
  }

}
