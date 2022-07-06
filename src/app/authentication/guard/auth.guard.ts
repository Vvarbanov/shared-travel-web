import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_TOKEN_KEY, LOGIN_ROUTER_URL } from '../../core/constants';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.localStorageService.get(AUTH_TOKEN_KEY)) {
            return this.router.parseUrl(LOGIN_ROUTER_URL);
        }

        return true;
    }
}