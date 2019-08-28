import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-pass-otp',
  templateUrl: './forgot-pass-otp.component.html',
  styleUrls: ['./forgot-pass-otp.component.scss']
})
export class ForgotPassOtpComponent implements OnInit {
  mobileNo:number;
  showSpinner:boolean=false;
  errorMsg:string;
  successMsg:string;
  constructor(
    private router: Router,private route: ActivatedRoute,) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }
  sendOTPRequest(){
   /*  this.errorMsg=null;
    this.successMsg=null;
    this.showSpinner=true;
    
    this.userService.passwordResetOtp(this.mobileNo).subscribe(
      resp=>{
        if(resp.statusCode==2000){
          let userId=resp.responseBo.bo;
          this.router.navigate(['/verifyResetOtp'],{queryParams:{userId:userId,successMsg:resp.statusMessage}});
         // this.successMsg=resp.statusMessage
        }else{
          this.errorMsg=resp.statusMessage;
        }
        this.showSpinner=false;
      },
      error=>{
        this.errorMsg="Oops!,Unexpected Error"
        this.showSpinner=false;
      }
    ) */
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
