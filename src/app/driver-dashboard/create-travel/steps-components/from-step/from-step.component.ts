import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-from-step',
    templateUrl: './from-step.component.html',
    styleUrls: ['./from-step.component.scss']
})
export class FromStepComponent {
    formData: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formData = this.formBuilder.group({
            from: ['', Validators.required],
        });
    }

    updateField(value: string): void {
        this.formData.controls.from?.setValue(value);
    }
}
