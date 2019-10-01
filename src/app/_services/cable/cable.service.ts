import { Injectable } from '@angular/core';

import { SmartConstantsService } from '../smart-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainNavComponent } from 'src/app/main-nav/main-nav.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CableService {

  

  constructor(private _http: HttpClient, private smart_consts: SmartConstantsService) { }
      
        getTokenHeader(){
         
          return { headers: new HttpHeaders().set('access_token', localStorage.getItem("access_token"))}
          
        }
        login(username,password) {
            const httpOptions = {
              headers: new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' }),
              observe: 'response' as 'response'
            };
            let authOb="username="+username+"&password="+password+"&grant_type=password"; 
            return this._http.post<any>(this.smart_consts.expenseServiceUrl+"/login",authOb,httpOptions);
        } 
        registerOrUpdateUser(user){
          let _url=this.smart_consts.expenseServiceUrl+'/user';
          const httpOptions = {
            observe: 'response' as 'response'
          };
            return this._http.post<any>(_url, user,httpOptions);
        }
        getUserData(userId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
          let _url=this.smart_consts.expenseServiceUrl+'/user/'+userId;
          return this._http.get<any>(_url,httpOptions);
        }
        //userTaks
        expenseClaimRegistered(userId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
          let _url=this.smart_consts.reportServiceUrl+'/expenseClaim/registered/'+userId;
          return this._http.get<any>(_url,httpOptions);
        }
        expenseClaimApproved(userId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
          let _url=this.smart_consts.reportServiceUrl+'/expenseClaim/approved/'+userId;
          return this._http.get<any>(_url,httpOptions);
        }

        //manager tasks
        
        expenseClaimPendingManager(userId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
          let _url=this.smart_consts.reportServiceUrl+'/expenseClaim/manager/pending/'+userId;
          return this._http.get<any>(_url,httpOptions);
        }

        expenseClaimApprovedManager(userId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
          let _url=this.smart_consts.reportServiceUrl+'/expenseClaim/manager/approved/'+userId;
          return this._http.get<any>(_url,httpOptions);
        }
        

        registerNewClaim(claim){
          const httpOptions = {
            observe: 'response' as 'response'
          };
         // let userId=localStorage.getItem("user_id");
          let _url=this.smart_consts.expenseServiceUrl+'/expenseClaim';
          return this._http.post<any>(_url,claim,httpOptions);
        }
       
      
        approveClaimManager(claimId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
         // let userId=localStorage.getItem("user_id");
          let _url=this.smart_consts.expenseServiceUrl+'/expenseClaim/approve/'+claimId;
          return this._http.get(_url,httpOptions);
        }
        rejectClaimManager(claimId){
          const httpOptions = {
            observe: 'response' as 'response'
          };
         // let userId=localStorage.getItem("user_id");
          let _url=this.smart_consts.expenseServiceUrl+'/expenseClaim/reject/'+claimId;
          return this._http.get(_url,httpOptions);
        }
        
        addNewClaim(claimDetails){
          let _url=this.smart_consts.expenseServiceUrl+'/expenseClaimDetails';
          const httpOptions = {
            observe: 'response' as 'response'
          };
            return this._http.post<any>(_url, claimDetails,httpOptions);
        }

        
}
