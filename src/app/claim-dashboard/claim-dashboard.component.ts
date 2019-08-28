import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { MatDialog } from '@angular/material';
import { SmartConstantsService } from '../_services/smart-constants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-claim-dashboard',
  templateUrl: './claim-dashboard.component.html',
  styleUrls: ['./claim-dashboard.component.scss']
})
export class ClaimDashboardComponent implements OnInit {

  regClaims;
  constructor(private route: ActivatedRoute, private router: Router,public sanitizer: DomSanitizer,
    private smartConstants: SmartConstantsService,public dialog: MatDialog,
   private mainNav: MainNavComponent) { }

  ngOnInit() {
    this.regClaims=[{id:11,claimName:"Claim1"},{id:12,claimName:"Claim2"}];
  }

  registerNewClaimNav(){
    this.router.navigate(['/regClaim'],{queryParams:{}});
  }
  approveClaimNav(){
    this.router.navigate(['/approveClaim'],{queryParams:{}});

  }
  addNewExpenseToClaimNav(){
    this.router.navigate(['/addExpenseDetails'],{queryParams:{}});
  }

}
