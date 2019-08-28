import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-claim',
  templateUrl: './approve-claim.component.html',
  styleUrls: ['./approve-claim.component.scss']
})
export class ApproveClaimComponent implements OnInit {


  regClaims;
  constructor() { }

  ngOnInit() {
    this.regClaims=[{id:11,claimName:"Claim1"},{id:12,claimName:"Claim2"}];
  }

  rejectClaim(){

  }
  approveClaimNav(){

  }
}
