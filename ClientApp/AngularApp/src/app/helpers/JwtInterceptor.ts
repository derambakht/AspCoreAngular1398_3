import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/accessRight/authenticate.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticateService: AuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.authenticateService.isAuthenticate) {
            const token = localStorage.getItem('token');
            request = request.clone({
                setHeaders: {
                    Authorization:`Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
