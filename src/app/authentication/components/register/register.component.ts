import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterRequest } from '../../models/register-request.model';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorService } from '../../services/validator.service';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../../../core/constants';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    @Input() emailValue!: string;
    @Output() emailValueChange = new EventEmitter<string>();

    formGroup: FormGroup;

    constructor(
        private formBulder: FormBuilder,
        private authenticationService: AuthenticationService,
        private validatorService: ValidatorService,
    ) {
        this.formGroup = this.formBulder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
            password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH), this.validatorService.passwordFormatValidator]],
            passwordConfirmation: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]]
        }, { validators: this.validatorService.passwordMatchingValidatior });
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

    register(data: RegisterRequest): void {
        this.authenticationService.register(data);
    }
}
