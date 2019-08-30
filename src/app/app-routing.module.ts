import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPassOtpComponent } from './fogot-pass-otp/forgot-pass-otp.component';
import { VerifyPassResetOtpComponent } from './verify-pass-reset-otp/verify-pass-reset-otp.component';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import { RegClaimComponent } from './reg-claim/reg-claim.component';
import { RegClaimDetailsComponent } from './reg-claim-details/reg-claim-details.component';
import { ClaimDashboardComponent } from './claim-dashboard/claim-dashboard.component';
import { ApproveClaimComponent } from './approve-claim/approve-claim.component';
import { ReportComponent } from './report/report.component';
const routes: Routes = [
  { path: '', redirectTo: '/loggedInHome', pathMatch: 'full' },
  { path: 'forgotPassword',   component: ForgetPasswordComponent },
  { path: 'forgotPasswordOtp',   component: ForgotPassOtpComponent },
  { path: 'verifyResetOtp',   component: VerifyPassResetOtpComponent },
  { path: 'resetPassword',   component: ResetPasswordComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'logout',   component: LogoutComponent,canActivate:[AuthGuard] },
  { path: 'regClaim',   component: RegClaimComponent,canActivate:[AuthGuard]  },
  { path: 'addExpenseDetails',   component: RegClaimDetailsComponent,canActivate:[AuthGuard]  },
  { path: 'claimDashboard',   component: ClaimDashboardComponent ,canActivate:[AuthGuard] },
  { path: 'approveClaim',   component: ApproveClaimComponent,canActivate:[AuthGuard]  },
  { path: 'report',   component: ReportComponent ,canActivate:[AuthGuard] },
  { path: 'genError',  component:GenericErrorComponent},
  /* this line should be last */
  { path: '**',   component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
