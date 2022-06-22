/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { FindTravelComponent } from './find-travel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FindTravelComponent', () => {
    let component: FindTravelComponent;
    let fixture: ComponentFixture<FindTravelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FindTravelComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FindTravelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
