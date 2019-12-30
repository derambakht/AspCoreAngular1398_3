import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/layout/sidebar-menu/sidebar-menu.component';

@Injectable({
  providedIn: 'root'
})
export class UserMenuService {
  private apiUrl = environment.APIUrl + "/UserMenuItem";
  constructor(private http:HttpClient) { 
    this.getUserMenu();
  }
 
  userMenuItems:MenuItem[];

  getUserMenu():Observable<MenuItem[]> {
      const refreshToken = localStorage.getItem('refresh-token');
      return this.http.get<MenuItem[]>(this.apiUrl + `/${refreshToken}`);
  }
}
