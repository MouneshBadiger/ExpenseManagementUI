import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  photoUrl:string;
  username:string;
  buttonName:string;
 
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    ngOnInit(){
      this.photoUrl=this.data.photoUrl;
      this.username=this.data.username;
      this.buttonName=this.data.buttonName;
    }

}
