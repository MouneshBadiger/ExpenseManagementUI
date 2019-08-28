import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmartConstantsService {
  appName:string='Trendfly';
  profileChanged:boolean=false;
  defPic="assets/user.png";
  monthsArr=["January","February","March","April","May","June","July","August","September","October","Novermber","December"];

  formatDateDDMMMYYYY(date:Date){
    let dateStr=date.getDate()+"-"+this.monthsArr[date.getMonth()]+"-"+date.getFullYear();
    return dateStr;
  }
  formatDateTo_YYYY_MM_dd(date:Date){
    let dateStr=''+date.getFullYear();
     if(date.getMonth()<10){
      dateStr+='-0';
     }else{
      dateStr+='-';
     }

     dateStr+=(date.getMonth()+1);

     if(date.getDate()<10){
      dateStr+='-0';
     }else{
      dateStr+='-';
     }
     dateStr+=date.getDate();
     return dateStr;
  }
 
  
  hostUrl="http://localhost:4200/";
  reportServiceUurl:string="http://localhost:8082";
  expenseServiceUrl:string="http://localhost:8081";
 
  constructor() { }

  
}
