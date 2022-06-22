import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AUTH_TOKEN_KEY, PROFILE_TOKEN_KEY } from 'src/app/core/constants';
import { Events } from 'src/app/core/models/events.model';
import { EventBrokerService } from 'src/app/core/services/events/event-broker.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { RedirectService } from 'src/app/core/services/redirects/redirect.service';
import { AuthError } from '../models/auth-error.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { AuthenticationHttpService } from './authentication-http.service';
import { ChangePasswordRequest } from '../models/change-password-request.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private authErrorSubject = new Subject<AuthError>();

    constructor(
        private dialog: MatDialog,
        private redirectService: RedirectService,
        private authenticationHttpService: AuthenticationHttpService,
        private localStorageService: LocalStorageService,
        private eventService: EventBrokerService
    ) { }

    get authErrorObs(): Observable<AuthError> {
        return this.authErrorSubject.asObservable();
    }

    login(loginRequest: LoginRequest): void {
        this.authenticationHttpService.login(loginRequest)
            .subscribe({
                next: jwt => this.saveAuthentication(jwt),
                error: error => {
                    switch (error.status) {
                        case 401:
                            this.authErrorSubject.next(AuthError.WrongCredentials);
                            break;
                        default:
                            this.authErrorSubject.next(AuthError.AuthServerError);
                    }

                }
            });
    }

    register(registerRequest: RegisterRequest): void {
        this.authenticationHttpService.register(registerRequest)
            .subscribe({
                next: jwt => this.saveAuthentication(jwt),
                error: error => {
                    switch (error.status) {
                        case 400:
                            this.authErrorSubject.next(AuthError.BadCredentials);
                            break;
                        default:
                            this.authErrorSubject.next(AuthError.AuthServerError);
                    }
                }
            });
    }

    changePassword(changePasswordRequest: ChangePasswordRequest): void {
        this.authenticationHttpService.changePassword(changePasswordRequest)
            .subscribe({
                next: () => this.logout(),
                error: error => {
                    switch (error.status) {
                        case 400:
                        case 401:
                            this.authErrorSubject.next(AuthError.WrongCredentials);
                            break;
                        default:
                            this.authErrorSubject.next(AuthError.AuthServerError);
                    }
                }
            });
    }

    logout(): void {
        this.dialog.closeAll();
        this.localStorageService.remove(AUTH_TOKEN_KEY);
        this.localStorageService.remove(PROFILE_TOKEN_KEY);
        this.eventService.publishEvent(Events.logoutSuccessful);
        this.redirectService.navigateLogin();
    }

    private saveAuthentication(jwt: string): void {
        this.localStorageService.set(AUTH_TOKEN_KEY, jwt);
        this.eventService.publishEvent(Events.loginSuccessful);
        this.redirectService.navigateHome();
    }
}
