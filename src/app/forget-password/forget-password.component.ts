import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  emailId:string;
  showSpinner:boolean=false;
  errorMsg:string;
  successMsg:string;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }
  sendResetMail(){
   /*  this.errorMsg=null;
    this.successMsg=null;
    this.showSpinner=true;
    this.userService.passwordResetLink(this.emailId).subscribe(
      resp=>{
        if(resp.statusCode==2000){
          this.successMsg=resp.statusMessage
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
