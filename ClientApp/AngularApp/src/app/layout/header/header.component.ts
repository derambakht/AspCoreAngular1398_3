import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/accessRight/authenticate.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fullName:string = null;
  thumbnail:string =  require('src/assets/images/user-photo.jpg');
  constructor(private authService:AuthenticateService) { }

  ngOnInit() {
    const result = this.authService.getUserLoginInfo();
    this.fullName = `${result.firstName} ${result.lastName}`; 
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }
}
