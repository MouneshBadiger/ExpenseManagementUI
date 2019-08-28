import { Component } from '@angular/core';
import { SmartConstantsService } from './_services/smart-constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appName:string;
  constructor(private smartConstants:SmartConstantsService){}
  ngOnInit(){
    this.appName=this.smartConstants.appName;
    
  }
}
