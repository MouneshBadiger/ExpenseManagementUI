import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CableService } from '../_services/cable/cable.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-reg-claim-details',
  templateUrl: './reg-claim-details.component.html',
  styleUrls: ['./reg-claim-details.component.scss']
})
export class RegClaimDetailsComponent implements OnInit {

  errorMsg:string;
  registrationForm: FormGroup;
  subDto;
  showSpinner:boolean;
  constructor(private fb: FormBuilder,private cableService:CableService,
    private router: Router,private route: ActivatedRoute,
    private mainNav: MainNavComponent) { }

  ngOnInit() {
   
    this.registrationForm = this.fb.group({
      id: [''],
      expenseName: ['', [Validators.required]],
      desciption: ['',[Validators.required]],
      expenseType: ['',[Validators.required]],
      paymentMode:['',[Validators.required]],
    });
  
    

  }
  get id() {
    return this.registrationForm.get('id');
  }
  get expenseName() {
    return this.registrationForm.get('expenseName');
  }

  get desciption() {
    return this.registrationForm.get('desciption');
  }
  get expenseType() {
    return this.registrationForm.get('expenseType');
  }
  get paymentMode(){
    return this.registrationForm.get('paymentMode');
  }
  getSubscriberDataEdit() {
    this.registrationForm.patchValue({
      id: this.subDto.id,
      subscriberName: this.subDto.subscriberName,
      contactNo: this.subDto.contactNo,
      stbId: this.subDto.stbId,
      subscribedDate : new Date(this.subDto.subscribedDate),
      vcNumber:this.subDto.vcNumber,
      stbModel:this.subDto.stbModel,
      adarCardNo:this.subDto.adarCardNo,
      address: this.subDto.address,
    });
  }

  onSubmit() {
    this.errorMsg=null;
    this.showSpinner=true;
    this.cableService.registerOrUpdateUser(this.registrationForm.value).subscribe(
        resp=>{
          if(resp.statusCode==2000){
            this.router.navigate(['/opertorDashboard'],{queryParams:{successMsg:'Subscriber added/updated successfully'}});
          }else{
            this.errorMsg=resp.statusMessage;
          }
          this.showSpinner=false;
        },
        error=>{
          this.errorMsg="Oops!,Unexpected Error"
          this.showSpinner=false;
          this.mainNav.checkTokenExpAndLogout(error);
        }
      )
  }
  back(){
    window.history.back();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 
  disTyping(event: any){
    event.preventDefault();
  }

}
