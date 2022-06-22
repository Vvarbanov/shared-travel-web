import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-to-step',
    templateUrl: './to-step.component.html',
    styleUrls: ['./to-step.component.scss']
})
export class ToStepComponent {
    formData: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formData = this.formBuilder.group({
            to: ['', Validators.required],
        });
    }

    updateField(value: string): void {
        this.formData.controls.to?.setValue(value);
    }
}
