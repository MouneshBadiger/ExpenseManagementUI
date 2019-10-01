import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { MatDialog } from '@angular/material';
import { SmartConstantsService } from '../_services/smart-constants.service';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

/** @title Responsive sidenav */
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnDestroy {
  appName:string;
  mobileQuery: MediaQueryList;
  userId;
  username:string;
  photoUrl:string;
  isSosLogin;
  gpsLocation;
  isWebview:boolean;
  isDesktopView:boolean;
  hasRoleAdmin:boolean;
  //progress bar
  loading:boolean=false;
  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute, private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public dialog: MatDialog,private smartConstants:SmartConstantsService, ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener,);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.appName=this.smartConstants.appName;
    this.smartConstants.currentUserName.subscribe(usrN => this.username = usrN);
    if(localStorage.getItem('username')!=null){
      this.username=localStorage.getItem('username');
      this.smartConstants.changeUserName( this.username);
    }
   
    this.photoUrl=localStorage.getItem('photoUrl');
    this.userId=localStorage.getItem('userId');
    this.isSosLogin=localStorage.getItem('isSosLogin');
    let isWebview=localStorage.getItem('isWebview');
   
  
    let rolesAr= JSON.parse(localStorage.getItem('userRoles'));
    if(rolesAr!=null){
      rolesAr.forEach(element => {
        if(element=='ROLE_ADMIN'){
          this.hasRoleAdmin=true;
        }
      });
    }
    const mq = window.matchMedia( "(min-width:768px)" );
      if (mq.matches) {
        this.isDesktopView=true;
      } else {
        this.isDesktopView=false;
      }
   }
  shouldRun = true;

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
  }
  customLogout(){
    localStorage.clear();
    this.smartConstants.changeUserName(null);
    this.username=null;
    
  }
  checkTokenExpAndLogout(errorResp){
    if(errorResp!=null && errorResp.error!=null && errorResp.error.error=='invalid_token'){
     this.customLogout();
    }
  }
 
  openEditProfileDialog(): void {
    let wid;
    if(this.isDesktopView)
        wid='40%'
    else
         wid='80%'
    
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: wid, data: {photoUrl: this.photoUrl,username:this.username,buttonName:'Edit'}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result=='Yes'){
          this.router.navigate(['/register']);
        }
      });
  }
  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
   
  }
  
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */