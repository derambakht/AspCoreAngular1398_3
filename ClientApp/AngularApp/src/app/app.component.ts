import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticateService } from './services/accessRight/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private permissionsService: NgxPermissionsService,
    private authService:AuthenticateService){}
  
  title = 'FirstApp';
  userPermissions = ["ADMIN2", "EDITOR"];
  isAuthenticate:boolean;
  
  ngOnInit(){
    this.permissionsService.loadPermissions(this.userPermissions);
    this.isAuthenticate = this.authService.isAuthenticate;
  }
}
