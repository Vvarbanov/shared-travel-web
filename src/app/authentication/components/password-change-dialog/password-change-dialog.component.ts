import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorService } from '../../services/validator.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordRequest } from '../../models/change-password-request.model';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../../core/constants';

@Component({
    selector: 'app-password-change-dialog',
    templateUrl: './password-change-dialog.component.html',
    styleUrls: ['./password-change-dialog.component.scss']
})
export class PasswordChangeDialogComponent implements OnInit, OnDestroy {

    private subscriptions = new Subscription();

    formGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
        private formBulder: FormBuilder,
        private authenticationService: AuthenticationService,
        private validatorService: ValidatorService,
    ) {
        this.formGroup = this.formBulder.group({
            oldPassword: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)]],
            password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH), this.validatorService.passwordFormatValidator]],
            passwordConfirmation: ['', [Validators.required]]
        }, { validators: [this.validatorService.passwordMatchingValidatior, this.validatorService.newPasswordNotMatchingValidatior] });
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.authenticationService.authErrorObs.subscribe(authError => {
                this.formGroup.get('oldPassword')?.setErrors({ authError });
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    changePassword(data: ChangePasswordRequest): void {
        this.authenticationService.changePassword(data);
    }
}
