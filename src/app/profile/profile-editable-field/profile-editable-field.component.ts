import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ProfileHttpService } from '../../core/services/http/profile-http.service';

@Component({
    selector: 'app-profile-editable-field',
    templateUrl: './profile-editable-field.component.html',
    styleUrls: ['./profile-editable-field.component.scss']
})
export class ProfileEditableFieldComponent implements OnInit, OnDestroy {
    @Input() propertyName: string;
    @Input() id: number;

    @Input() label: string = '';
    @Input() prefix = '';

    @Input() numberOnly = false;
    @Input() maxLength = 25;
    @Input() minLength = 0;
    @Input() hasMinLengthValidation = false;
    @Input() hasEmailValidation = false;

    // [(defaultValue)] binding for the user.property
    @Input() defaultValue: string;
    @Output() defaultValueChange = new EventEmitter<string>();

    edit = false;
    formGroup: FormGroup;

    constructor(
        private profileHttpService: ProfileHttpService,
        private authenticationService: AuthenticationService,
        private formBulder: FormBuilder,
    ) {
        this.defaultValue = '';
        this.propertyName = '';
        this.id = 0;

        this.formGroup = this.formBulder.group({
            field: [{ value: '', disabled: true }, [Validators.required]],
        });
    }

    get field(): AbstractControl | null {
        return this.formGroup.get('field');
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.defaultValueChange.complete();
    }

    private initForm(): void {
        this.field?.setValue(this.defaultValue);
        this.field?.addValidators(Validators.maxLength(this.maxLength));
        if (this.hasMinLengthValidation && this.minLength) {
            this.field?.addValidators(Validators.minLength(this.minLength));
        }
        if (this.hasEmailValidation) {
            this.field?.addValidators(Validators.email);
        }
    }

    startEdit(inputElement: HTMLElement): void {
        this.edit = true;
        this.field?.enable();

        setTimeout(() => inputElement.focus(), 10);
    }

    saveEdit(): void {
        this.edit = false;
        this.field?.disable();

        const updateObject = { [this.propertyName]: this.formGroup.value.field };
        this.profileHttpService.patchProfile(updateObject).subscribe({
            next: (res: any) => {
                if (this.propertyName === "email") {
                    return this.authenticationService.logout();
                }

                // Emit the new value, so the user object is updated in the parent component
                this.defaultValueChange.emit(res[this.propertyName]);
            }, error: e => console.error(e)
        });
    }

    cancelEdit(): void {
        this.edit = false;
        this.field?.disable();
        this.resetField();
    }

    private resetField(): void {
        this.field?.setValue(this.defaultValue);
    }
}
