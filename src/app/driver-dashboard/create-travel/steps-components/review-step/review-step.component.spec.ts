/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationTranslatePipeModule } from '../../../../core/services/pipes/location-translate.pipe';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
    let component: ReviewStepComponent;
    let fixture: ComponentFixture<ReviewStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                LocationTranslatePipeModule
            ],
            declarations: [ReviewStepComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReviewStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
