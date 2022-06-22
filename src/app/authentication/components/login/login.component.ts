import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../../models/login-request.model';
import { AuthenticationService } from '../../services/authentication.service';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../../../core/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    formGroup: FormGroup;

    @Input() emailValue!: string;
    @Output() emailValueChange = new EventEmitter<string>();

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
        this.formGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
            password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)]]
        });
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.authenticationService.authErrorObs.subscribe(authError => {
                this.formGroup.get('password')?.setErrors({ authError });
            })
        );

        this.subscriptions.add(
            this.formGroup.get('email')?.valueChanges.subscribe(val => {
                this.emailValueChange.emit(val);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.emailValueChange.complete();
    }

    login(loginData: LoginRequest): void {
        this.authenticationService.login(loginData);
    }
}
