import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MatButtonModule,MatFormFieldModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from 'src/material-module';
import { LoginComponent } from './login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutComponent } from './about/about.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ForgotPassOtpComponent } from './fogot-pass-otp/forgot-pass-otp.component';
import { VerifyPassResetOtpComponent } from './verify-pass-reset-otp/verify-pass-reset-otp.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import { RegClaimComponent } from './reg-claim/reg-claim.component';
import { RegClaimDetailsComponent } from './reg-claim-details/reg-claim-details.component';
import { ClaimDashboardComponent } from './claim-dashboard/claim-dashboard.component';
import { ApproveClaimComponent } from './approve-claim/approve-claim.component';
import { ReportComponent } from './report/report.component';
 
let config = new AuthServiceConfig([
   {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("473703356624-999u7ovo4ilsu9ilm2mihrvlstj1406v.apps.googleusercontent.com")
  }, 
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1071034593070210")
  }
]);
 
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PageNotFoundComponent,
    LoginComponent,
    MainNavComponent,
    LogoutComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AboutComponent,
    ForgotPassOtpComponent,
    VerifyPassResetOtpComponent,
    VerifyPassResetOtpComponent,
    EditProfileDialogComponent,
    GenericErrorComponent,
    RegClaimComponent,
    RegClaimDetailsComponent,
    ClaimDashboardComponent,
    ApproveClaimComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule,
    ImageCropperModule,
    Ng2ImgMaxModule,
    InfiniteScrollModule
  ],
  providers: [
    AuthGuard,
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig,
    }
  ],
  entryComponents: [ 
    EditProfileDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
