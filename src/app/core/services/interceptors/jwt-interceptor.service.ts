import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHORIZATION_HEADER, AUTH_TOKEN_KEY, BEARER_PREFIX } from '../../constants';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

    constructor(private localStorageService: LocalStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.localStorageService.get(AUTH_TOKEN_KEY);

        if (!jwt) {
            return next.handle(req);
        }

        if (this.tokenExpired(jwt)) {
            // TODO: Add refresh token here
            this.localStorageService.remove(AUTH_TOKEN_KEY);
            return next.handle(req);
        }


        const authReq = req.clone({
            headers: req.headers
                .set(AUTHORIZATION_HEADER, `${ BEARER_PREFIX }${ jwt }`)
        });

        return next.handle(authReq);
    }

    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}
