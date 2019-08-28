import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-pass-reset-otp',
  templateUrl: './verify-pass-reset-otp.component.html',
  styleUrls: ['./verify-pass-reset-otp.component.scss']
})
export class VerifyPassResetOtpComponent implements OnInit {

  otp:number;
  userId;
  showSpinner:boolean=false;
  errorMsg:string;
  successMsg:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.successMsg=params.get('successMsg');
      this.userId=params.get('userId');
      window.scrollTo(0,0);
   });
  }
  onVerifySubmit(){
   /*  this.errorMsg=null;
    this.successMsg=null;
    this.showSpinner=true;
      this.userService.checkIsOtpCorrect(this.userId,this.otp).subscribe(
        resp=>{
          if(resp.statusCode==2000){
            this.successMsg=resp.statusMessage
            this.router.navigate(['/resetPassword'],{queryParams:{edocresu:this.userId,otp:this.otp,successMsg:'OTP verified successfully.'}});
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

}
