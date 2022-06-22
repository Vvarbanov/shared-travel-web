import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_ROUTER_URL, LOGIN_ROUTER_URL } from '../../constants';

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    constructor(private router: Router) { }

    navigateHome(): void {
        this.navigateToUrl(BASE_ROUTER_URL);
    }

    navigateLogin(): void {
        this.navigateToUrl(LOGIN_ROUTER_URL);
    }

    navigateToUrl(url: string): void {
        this.router.navigateByUrl(url);
    }
}
