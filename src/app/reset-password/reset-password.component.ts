import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  emailId:string;
  password:string;
  confirmPassword:string;
  errorMsg:string;
  successMsg:string=null;
  successMsgQ:string=null;
  showSpinner:boolean=false;
  userId:number;
  resetCode:string;
  otp:string;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
   this.errorMsg=null;
   this.successMsg=null;
    this.route.queryParamMap.subscribe(params => {
      this.successMsgQ=params.get('successMsg');
       this.userId=parseInt(params.get('edocresu'));
        this.resetCode=params.get('resetCode');
        this.otp=params.get('otp');
    });
    window.scrollTo(0,0);
  }
  subbmitResetRequest(){
   /* this.errorMsg=null;
   this.successMsg=null;
   this.successMsgQ=null;
   
    let data='password='+this.password+"&userId="+this.userId+"&resetCode="+this.resetCode+"&otp="+this.otp;
    this.userService.resetPasswordSubmit(data).subscribe(
      resp=>{
        if(resp.statusCode==2000){
          this.successMsg=resp.statusMessage;
        }else{
          this.errorMsg=resp.statusMessage;
        }
      },
      error=>{
        this.errorMsg="Oops! Unexpected error"
      }
    ); */
  }

}
