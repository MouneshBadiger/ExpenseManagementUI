import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator';
import { ForbiddenNameValidator } from '../shared/user-name.validator';
import { Tenant } from '../models/tenants';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SmartConstantsService } from '../_services/smart-constants.service';
import { CableService } from '../_services/cable/cable.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  genError:string;
  selectedFile=null;
  registrationForm: FormGroup;
  userId;
  isSosLogin;
  photoUrl;
  showSpinner:boolean;
  constructor(private fb: FormBuilder,private smartConstants: SmartConstantsService,
    private cableService: CableService,
    private router: Router,private route: ActivatedRoute,
    private mainNav: MainNavComponent) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      id: [''],
      userName: ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/password/)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(6)]],
      emailId: ['',[Validators.email]],
      mobileNo:['',[Validators.required]],
    }, { validator: PasswordValidator });
    this.loadAPIData();

  }
  get id() {
    return this.registrationForm.get('id');
  }
  get userName() {
    return this.registrationForm.get('userName');
  }

  get emailId() {
    return this.registrationForm.get('emailId');
  }
  get mobileNo() {
    return this.registrationForm.get('mobileNo');
  }
  get password(){
    return this.registrationForm.get('password');
  }

  loadAPIData() {
     this.userId=localStorage.getItem('user_id');
     if(this.userId!=null){
      this.mainNav.loading=true;
      this.cableService.getUserData(this.userId).subscribe(
         resp=>{
          this.registrationForm.patchValue({
            id: resp.id,
            userName: resp.userName,
            password: resp.password,
            confirmPassword: resp.confirmPassword,
            emailId: resp.emailId,
            mobileNo: resp.mobileNo,
          });
          this.mainNav.loading=false;
       },
       error=>{
        this.mainNav.loading=false;
        this.genError="Oops! Unexpected error."
        this.mainNav.checkTokenExpAndLogout(error);
       });
     }
  }
  onSubmit() {
    this.genError="";
    if(this.validateFormData()){
      console.log(JSON.stringify(this.registrationForm.value));
      this.showSpinner=true;
    /*   var fd = new FormData();
      fd.append("data",JSON.stringify(this.registrationForm.value)) */
      this.cableService.registerOrUpdateUser(this.registrationForm.value)
      .subscribe(
        response => {
          this.showSpinner=false;
          
          if(response.headers.get('Status Code')==201){
            let access_token=response.headers.get('access_token');
            localStorage.setItem('access_token', access_token);
            localStorage.setItem("user_id",response.id);
            this.router.navigate(['/claimDashboard']);
         
          }else{
            this.genError=response.statusMessage;
          }
        },
        error =>{
          this.showSpinner=false;
          console.error('Error!', error)
          this.genError="Oops!! That was unexpected.";
          this.mainNav.checkTokenExpAndLogout(error);
        }
      );
    }else{
       this.genError="Please correct the entered details."
      
    }
    
  }

  validateFormData():boolean{
    if(this.registrationForm.value.userName==""
    || this.registrationForm.value.password==""
    || this.registrationForm.value.confirmPassword!=this.registrationForm.value.password
    || this.registrationForm.value.mobileNo==""
    ||(this.registrationForm.value.email=="" )){

      return false;

    }
    return true;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // onFileSelectecd(event){
  //   this.selectedFile=event.target.files[0];
  // }

}
