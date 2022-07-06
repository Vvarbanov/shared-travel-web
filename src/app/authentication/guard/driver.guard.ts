import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BASE_ROUTER_URL } from '../../core/constants';
import { AuthorityEnum } from '../models/authority.enum';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class DriverGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }


    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authenticationService.hasAuthority(AuthorityEnum.DRIVER)) {
            return this.router.parseUrl(BASE_ROUTER_URL);
        }

        return true;
    }
}
