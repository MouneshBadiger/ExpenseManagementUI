import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router,ParamMap } from '@angular/router';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { SmartConstantsService } from '../_services/smart-constants.service';
import { CableService } from '../_services/cable/cable.service';


/** @title Responsive sidenav */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
 
  username:string;
  password:string;
  errorMsg:string;
  successMsg:string;
  showSpinner:boolean;
  user:any;
  sosLoggedIn:boolean;

  constructor(private mainNav:MainNavComponent,
    private cableService:CableService,
    private route: ActivatedRoute,
    private router: Router,private smart_consts: SmartConstantsService) {
   
  }
 
  ngOnInit(){
    this.errorMsg="";
    this.successMsg="";
    
  
    window.scrollTo(0,0);
  }
  ngAfterViewInit(){
    this.mainNav.loading=false;
  }
  ngOnDestroy(): void {
  }
  
  
 
  signOut(): void {
    localStorage.clear();
  }
  onSubmit() {
    if(this.username!=null && this.password!=null){
      this.mainNav.loading=true;
      this.showSpinner=true;
      this.errorMsg="";
      this.cableService.login(this.username,this.password)
        .subscribe( 
          response => {
              if(response.status==200){
                console.log(response.headers)
                localStorage.setItem('access_token', response.headers.get('access_token'));
                localStorage.setItem('username', response.body.userName);
                this.smart_consts.changeUserName(response.body.userName);
                localStorage.setItem("user_id",response.body.id);
                this.router.navigate(['/claimDashboard'],{queryParams:{successMsg:'Login successfull'}});
              }else{
                this.errorMsg="Unable to Login";
              }
          },
          error => {
            console.error('Erroru=', error)
            if(error.status==400  || error.status!=201){
              this.errorMsg="Invalid Credentials";
            }
            this.showSpinner=false;
            this.mainNav.loading=false;
          }
        );
    }else{
      this.errorMsg="Please enter your user name and password"
    }
   
  }
  gotoRegister(){
    this.router.navigate(['/register']);
  }
  gotoForgotPass(){
    this.router.navigate(['/forgotPassword']);
  }
}

