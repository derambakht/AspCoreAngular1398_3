import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticateService } from '../services/accessRight/authenticate.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticateService: AuthenticateService,
        private ngxService: NgxUiLoaderService,
        private _notifications: NotificationsService,
        private http:HttpClient,
        private router : Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.ngxService.stopAll();
            
            if (err.status === 401) {
                // //this._notifications.warn("زمان لاگین شما به اتمام رسیده است");
                this.authenticateService.getTokenWithRefreshToken(request).subscribe(result => {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('refresh-token', result.refreshToken);
                  });
                  
                  return next.handle(request); 
            }
            if (err.status === 400) {
                if(err.error == "Invalid Refresh Token")
                {
                    this.authenticateService.logout();
                } 
            }

            const error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}
