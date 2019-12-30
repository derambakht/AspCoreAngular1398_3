import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/models/accessRight/Login';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http:HttpClient) { }

 get isAuthenticate() {
  return localStorage.getItem('token') ? true : false;
 }

  getUserLoginInfo() {
    return JSON.parse(localStorage.getItem('user'));
  }

  login(model : Login):Observable<any> {
    const api = environment.APIUrl + "/account/login";
    return this.http.post(api, model);
  }

  getTokenWithRefreshToken(request):Observable<any>{
    const refreshToken = localStorage.getItem('refresh-token');
    const api = environment.APIUrl + `/account/GetNewToken?refreshToken=${refreshToken}`;
    return this.http.get<any>(api);
  }

  logout(){
    localStorage.clear();
  }

}
