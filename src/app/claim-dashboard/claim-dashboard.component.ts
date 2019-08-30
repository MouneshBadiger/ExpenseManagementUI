import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { MatDialog } from '@angular/material';
import { SmartConstantsService } from '../_services/smart-constants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CableService } from '../_services/cable/cable.service';

@Component({
  selector: 'app-claim-dashboard',
  templateUrl: './claim-dashboard.component.html',
  styleUrls: ['./claim-dashboard.component.scss']
})
export class ClaimDashboardComponent implements OnInit {
  userId;
  regClaims;
  genError:string;
  selectedClaimId;
  successMsg;
  errorMsg;

  showSpinner:boolean;
  constructor(private route: ActivatedRoute, private router: Router,public sanitizer: DomSanitizer,
    private smartConstants: SmartConstantsService,public dialog: MatDialog,private cableService:CableService,
   private mainNav: MainNavComponent) { }

  ngOnInit() {
    //this.regClaims=[{id:11,claimName:"Claim1"},{id:12,claimName:"Claim2"}];
    this.route.queryParamMap.subscribe(params => {
      this.errorMsg=params.get('errorMsg');
      this.successMsg=params.get('successMsg');
     
    });
   this.getRegisteredClaims();
  }
  getRegisteredClaims(){
    this.userId=localStorage.getItem('user_id');
    if(this.userId!=null){
     this.mainNav.loading=true;
     this.cableService.expenseClaimApproved(this.userId).subscribe(
        resp=>{
          this.regClaims=resp.body;
         this.mainNav.loading=false;
      },
      error=>{
       this.mainNav.loading=false;
       this.genError="Oops! Unexpected error."
       this.mainNav.checkTokenExpAndLogout(error);
      });
    }
  }
  registerNewClaimNav(){
    this.router.navigate(['/regClaim'],{queryParams:{}});
  }
  approveClaimNav(){
    this.router.navigate(['/approveClaim'],{queryParams:{}});

  }
  addNewExpenseToClaimNav(){
    this.router.navigate(['/addExpenseDetails'],{queryParams:{'expenseClaimId':this.selectedClaimId}});
  }

}
