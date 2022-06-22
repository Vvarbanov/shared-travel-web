import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ProfileHttpService } from '../../core/services/http/profile-http.service';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
    selector: 'app-profile-editable-field',
    templateUrl: './profile-editable-field.component.html',
    styleUrls: ['./profile-editable-field.component.scss']
})
export class ProfileEditableFieldComponent implements OnInit, OnDestroy {
    @Input() propertyName: string;
    @Input() id: number;

    @Input() label: string;
    @Input() length: number = 25;

    // [(defaultValue)] binding for the user.property
    @Input() defaultValue: string;
    @Output() defaultValueChange = new EventEmitter<string>();

    editValue: string;
    edit: boolean;

    constructor(
        private profileHttpService: ProfileHttpService,
        private authenticationService: AuthenticationService,
    ) {
        this.defaultValue = '';
        this.propertyName = '';
        this.id = 0;
        this.label = '';

        this.editValue = '';
        this.edit = false;
    }

    ngOnInit(): void {
        this.resetField();
    }

    ngOnDestroy(): void {
        this.defaultValueChange.complete();
    }

    startEdit(inputElement: HTMLElement): void {
        this.edit = true;

        setTimeout(() => inputElement.focus(), 10);
    }

    saveEdit(): void {
        this.edit = false;

        const updateObject = { [this.propertyName]: this.editValue };
        this.profileHttpService.patchProfile(updateObject).subscribe({
            next: (res: any) => {
                if (this.propertyName === "email") {
                    this.authenticationService.logout();
                }

                // Emit the new value, so the user object is updated in the parent component
                this.defaultValueChange.emit(res[this.propertyName]);
            }, error: e => console.error(e)
        });
    }

    cancelEdit(): void {
        this.edit = false;
        this.resetField();
    }

    private resetField(): void {
        this.editValue = this.defaultValue;
    }
}
