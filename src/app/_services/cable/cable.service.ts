import { Injectable } from '@angular/core';

import { SmartConstantsService } from '../smart-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainNavComponent } from 'src/app/main-nav/main-nav.component';

@Injectable({
  providedIn: 'root'
})
export class CableService {

  constructor(private _http: HttpClient,
    private smart_consts: SmartConstantsService) { }

        getTokenHeader(){
         
          return { headers: new HttpHeaders().set('access_token', localStorage.getItem("access_token"))}
          
        }
        getOptions(){
          return {
            headers: { headers: new HttpHeaders().set('Content-Type', "application/json").set('Accept','application/json')}
           };
        }
        login(username,password) {
            let authOb="username="+username+"&password="+password+"&grant_type=password"; 
          return this._http.post<any>(this.smart_consts.expenseServiceUrl,authOb);
        } 
        registerOrUpdateUser(user){
          let _url=this.smart_consts.expenseServiceUrl+'/user';
          
            return this._http.post<any>(_url, user);
        }
        getUserData(userId){
          let _url=this.smart_consts.expenseServiceUrl+'/user/'+userId;
          return this._http.get<any>(_url,this.getTokenHeader());
        }
        
}
