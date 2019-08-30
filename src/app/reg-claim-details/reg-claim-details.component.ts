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
  expenseClaimId;
  constructor(private fb: FormBuilder,private cableService:CableService,
    private router: Router,private route: ActivatedRoute,
    private mainNav: MainNavComponent) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.expenseClaimId=params.get('expenseClaimId');
     
    });
   
    this.registrationForm = this.fb.group({
      id: [''],
      expenseDetailName: ['', [Validators.required]],
      description: ['',[Validators.required]],
      typeOfExpense: ['',[Validators.required]],
      paymentMode:[''],
      expenseClaimId:[{id: this.expenseClaimId}],
      userId:[{id:localStorage.getItem("user_id")}]
    });
  
    

  }
  get id() {
    return this.registrationForm.get('id');
  }
  get expenseDetailName() {
    return this.registrationForm.get('expenseDetailName');
  }

  get description() {
    return this.registrationForm.get('description');
  }
  get typeOfExpense() {
    return this.registrationForm.get('typeOfExpense');
  }
  get paymentMode(){
    return this.registrationForm.get('paymentMode');
  }
  
  onSubmit() {
    this.errorMsg=null;
    this.showSpinner=true;
    this.cableService.addExpenseClaim(this.registrationForm.value).subscribe(
        resp=>{
            this.router.navigate(['/claimDashboard'],{queryParams:{successMsg:'Claim Details added/updated successfully'}});
         
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
