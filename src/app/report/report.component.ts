import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { CableService } from '../_services/cable/cable.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  errorMsg:string;
  successMsg:string;
  showSpinner:boolean=false;
  selType:string;
  displayedColumns: string[] = ["id",'claimName', 'travelStartDate','travelEndDate', 'userId','status'];
  dataSource: MatTableDataSource<Claim>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private mainNav: MainNavComponent,
    private cableService: CableService,
    private router: Router) { 
   }

  ngOnInit() {
    this.getRegistrationReport();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onCancel(){
    this.router.navigate(['/loggedInHome']);
  }
  onChannelPackChange(){
    if(this.selType=='1'){
      this.getRegistrationReport();
    }else{
      this.getApprovalReport();
    }
  }
  getRegistrationReport(){
   /*  let claimList=[
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
      {id:"12",claimName:"aaa",projectID:"sdads",travelStartDate:"dsfsd",travelEndDate:"dfsdf",userId:{userName:"sdfsdf"}},
    ]
    this.dataSource = new MatTableDataSource(claimList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; */
    let userId=localStorage.getItem("user_id");
    this.cableService.expenseClaimApproved(userId).subscribe(
      resp=>{
          let claimList=resp.body;
          this.dataSource = new MatTableDataSource(claimList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        
        this.showSpinner=false;
      },
      error=>{
        this.errorMsg="Oops!,Unexpected Error"
        this.showSpinner=false;
        this.mainNav.checkTokenExpAndLogout(error);
      }
    )
  }

  getApprovalReport(){
    let userId=localStorage.getItem("user_id");
    this.cableService.expenseClaimPendingManager(userId).subscribe(
      resp=>{
          let claimList=resp.body;
          this.dataSource = new MatTableDataSource(claimList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        
        this.showSpinner=false;
      },
      error=>{
        this.errorMsg="Oops!,Unexpected Error"
        this.showSpinner=false;
        this.mainNav.checkTokenExpAndLogout(error);
      }
    )
  }

}
export interface Claim {
 
}