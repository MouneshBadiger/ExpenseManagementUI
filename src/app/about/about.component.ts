import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  gpsJson;
  constructor(private mainNav:MainNavComponent) { }

  ngOnInit() {
    this.mainNav.loading=false;
    this.gpsJson=localStorage.getItem('gpsJson');
  }

}
