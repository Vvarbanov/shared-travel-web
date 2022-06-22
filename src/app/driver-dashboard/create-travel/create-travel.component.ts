import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-create-travel',
    templateUrl: './create-travel.component.html',
    styleUrls: ['./create-travel.component.scss']
})
export class CreateTravelComponent {
    stepperOrientation: Observable<StepperOrientation>;

    constructor(breakpointObserver: BreakpointObserver) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 50rem)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }
}
