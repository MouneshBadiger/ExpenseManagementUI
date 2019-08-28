import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  selectionType;
  displayedColumns: string[] = ["id",'claimName', 'travelStartDate','travelEndDate', 'userId'];
  dataSource: MatTableDataSource<Claim>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private mainNav: MainNavComponent,
    private router: Router) { 
   }

  ngOnInit() {
    this.getRegisteredClaim(1);
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
  getRegisteredClaim(userId){
    let claimList=[
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
    this.dataSource.sort = this.sort;
    /* this.cableService.getChannelList(chPackId).subscribe(
      resp=>{
        if(resp.statusCode==2000){
          this.channelList=resp.responseBo.bo;
          this.dataSource = new MatTableDataSource(this.channelList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
    ) */
  }

}
export interface Claim {
 
}