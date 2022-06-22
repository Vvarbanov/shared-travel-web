/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateTravelComponent } from './create-travel.component';

describe('CreateTravelComponent', () => {
    let component: CreateTravelComponent;
    let fixture: ComponentFixture<CreateTravelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateTravelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateTravelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
