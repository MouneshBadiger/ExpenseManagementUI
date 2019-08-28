import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,private sidenav:MainNavComponent) { }

  ngOnInit() {
    localStorage.clear();
    this.authService.signOut();
    this.sidenav.username=null;
    this.sidenav.photoUrl=null;
  }

}
