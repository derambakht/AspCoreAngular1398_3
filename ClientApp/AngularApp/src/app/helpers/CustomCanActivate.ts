import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { UserMenuService } from '../services/accessRight/user-menu.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
export class CustomCanActivate implements CanActivate {
  constructor(private userMenuService:UserMenuService) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>{
   
       return this.userMenuService.getUserMenu().pipe(
        map(res => {
            return res.filter(q => q.path == state.url).length > 0 ? true : false;
        }),
      );
  }
}