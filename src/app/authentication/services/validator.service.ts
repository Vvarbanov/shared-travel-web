import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

    constructor() { }

    passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('passwordConfirmation')?.value;

        return password === confirmPassword ? null : { notmatched: true };
    };

    newPasswordNotMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('oldPassword')?.value;
        const confirmPassword = control.get('password')?.value;

        return password === confirmPassword ? { newMatching: true } : null;
    };

    passwordFormatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;

        // Check if password contains at least one lower case letter
        if (!/[a-z]/.test(password)) {
            return { nolower: true };
        }

        // Check if password contains at least one capital letter
        if (!/[A-Z]/.test(password)) {
            return { nocapital: true };
        }

        // Check if password contains at least one number
        if (!/\d/.test(password)) {
            return { nonumber: true };
        }

        // Check if password contains at least one special symbol
        if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
            return { nospecial: true };
        }

        return null;
    };
}
