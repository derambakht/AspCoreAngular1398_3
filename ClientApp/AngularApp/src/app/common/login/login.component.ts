import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Login } from 'src/app/models/accessRight/Login';
import { AuthenticateService } from 'src/app/services/accessRight/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:Login = new Login();
  constructor(private service:AuthenticateService,
    private router:Router) { }


    @ViewChild("myDate", {static:false}) myDate: ElementRef;

  ngOnInit() {
  }

  login(){
    this.service.login(this.model).subscribe(result => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("refresh-token", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result));
      window.location.reload();
    })
  }

  setCurrentDate(){
    this.myDate.nativeElement.innerHTML = new Date();
  }
}
