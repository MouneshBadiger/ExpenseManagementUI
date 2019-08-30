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
      claimName: ['', [Validators.required]],
      projectID: ['',[Validators.required]],
      approverEmail: ['',[Validators.required]],
      travelStartDate:['',[Validators.required]],
      travelEndDate:['',[Validators.required]],
      status:[''],
      userId:[{id:localStorage.getItem("user_id")}]
    });
  
    

  }
 
  get claimName() {
    return this.registrationForm.get('claimName');
  }

  get projectID() {
    return this.registrationForm.get('projectID');
  }
  get approverEmail() {
    return this.registrationForm.get('approverEmail');
  }
  get travelStartDate(){
    return this.registrationForm.get('travelStartDate');
  }
  get travelEndDate(){
    return this.registrationForm.get('travelEndDate');
  }
  
  onSubmit() {
    this.errorMsg=null;
    this.showSpinner=true;
    this.cableService.registerNewClaim(this.registrationForm.value).subscribe(
        resp=>{
            this.showSpinner=false;
            this.router.navigate(['/claimDashboard'],{queryParams:{successMsg:'Claim added/updated successfully'}});
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