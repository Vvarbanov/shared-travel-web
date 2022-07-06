import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterAsDriverRequest } from 'src/app/core/components/register-driver-dialog/models/register-driver-request.model';
import { CHANGE_PASSWORD_REQUEST_URL, LOGIN_REQUEST_URL, REGISTER_AS_DRIVER_REQUEST_URL, REGISTER_REQUEST_URL } from 'src/app/core/constants';
import { ChangePasswordRequest } from '../models/change-password-request.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationHttpService {

    constructor(private http: HttpClient) { }

    login(loginRequest: LoginRequest): Observable<string> {
        return this.http.post(LOGIN_REQUEST_URL, loginRequest, { responseType: 'text' });
    }

    register(registerRequest: RegisterRequest): Observable<string> {
        return this.http.post(REGISTER_REQUEST_URL, registerRequest, { responseType: 'text' });
    }

    registerAsDriver(registerAsDriverRequest: RegisterAsDriverRequest): Observable<string> {
        return this.http.post(REGISTER_AS_DRIVER_REQUEST_URL, registerAsDriverRequest, { responseType: 'text' });
    }

    changePassword(changePasswordRequest: ChangePasswordRequest): Observable<void> {
        return this.http.patch<void>(CHANGE_PASSWORD_REQUEST_URL, changePasswordRequest);
    }
}
