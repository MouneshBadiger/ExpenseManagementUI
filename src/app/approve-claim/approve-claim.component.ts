import { Component, OnInit } from '@angular/core';
import { CableService } from '../_services/cable/cable.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartConstantsService } from '../_services/smart-constants.service';

@Component({
  selector: 'app-approve-claim',
  templateUrl: './approve-claim.component.html',
  styleUrls: ['./approve-claim.component.scss']
})
export class ApproveClaimComponent implements OnInit {


  regClaims;
  selectedClaimId;
  userId;
  errorMsg;
  successMsg:string;
  constructor(private mainNav:MainNavComponent,
    private cableService:CableService,
    private route: ActivatedRoute,
    private router: Router,private smart_consts: SmartConstantsService) { }

  ngOnInit() {
   // this.regClaims=[{id:11,claimName:"Claim1"},{id:12,claimName:"Claim2"}];
    this.getRegisteredPendingClaims();
  }

  rejectClaim(){
    this.userId=localStorage.getItem('user_id');
    if(this.userId!=null){
     this.mainNav.loading=true;
     this.cableService.rejectClaimManager(this.selectedClaimId).subscribe(
        resp=>{
          this.router.navigate(['/claimDashboard'],{queryParams:{}});
         this.mainNav.loading=false;
      },
      error=>{
       this.mainNav.loading=false;
       this.errorMsg="Oops! Unexpected error."
       this.mainNav.checkTokenExpAndLogout(error);
      });
    }
  }
  approveClaim(){
    this.userId=localStorage.getItem('user_id');
    if(this.userId!=null){
     this.mainNav.loading=true;
     this.cableService.approveClaimManager(this.selectedClaimId).subscribe(
        resp=>{
          this.router.navigate(['/claimDashboard'],{queryParams:{}});
         this.mainNav.loading=false;
      },
      error=>{
       this.mainNav.loading=false;
       this.errorMsg="Oops! Unexpected error."
       this.mainNav.checkTokenExpAndLogout(error);
      });
    }
  }
  getRegisteredPendingClaims(){
    this.userId=localStorage.getItem('user_id');
    if(this.userId!=null){
     this.mainNav.loading=true;
     this.cableService.expenseClaimPendingManager(this.userId).subscribe(
        resp=>{
          this.regClaims=resp.body;
         this.mainNav.loading=false;
      },
      error=>{
      /*  this.mainNav.loading=false;
       this.errorMsg="Oops! Unexpected error."
       this.mainNav.checkTokenExpAndLogout(error); */
      });
    }
  }
}
