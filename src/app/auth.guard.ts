import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'angularx-social-login';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user:any;
  socLoggedIn:boolean;
  constructor(       private router: Router) {}

  canActivate():boolean{
      if(localStorage.getItem("user_id")){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}
