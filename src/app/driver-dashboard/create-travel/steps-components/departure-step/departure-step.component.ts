import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-departure-step',
    templateUrl: './departure-step.component.html',
    styleUrls: ['./departure-step.component.scss']
})
export class DepartureStepComponent {
    formData: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formData = this.formBuilder.group({
            departureDate: [new Date(), Validators.required],
        });
    }
}
