import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { CableService } from '../_services/cable/cable.service';

@Component({
  selector: 'app-reg-claim',
  templateUrl: './reg-claim.component.html',
  styleUrls: ['./reg-claim.component.scss']
})
export class RegClaimComponent implements OnInit {

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
      claimName: ['', [Validators.required]],
      projectId: ['',[Validators.required]],
      approvarId: ['',[Validators.required]],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
    });
  
    

  }
  get id() {
    return this.registrationForm.get('id');
  }
  get claimName() {
    return this.registrationForm.get('claimName');
  }

  get projectId() {
    return this.registrationForm.get('projectId');
  }
  get approvarId() {
    return this.registrationForm.get('approvarId');
  }
  get startDate(){
    return this.registrationForm.get('startDate');
  }
  get endDate(){
    return this.registrationForm.get('endDate');
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
  openPackages(){
    this.router.navigate(['/configPackage'],{queryParams:{subId:this.subDto.id}});
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