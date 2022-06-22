/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TravelListCardComponent } from './travel-list-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TravelStatusEnum } from '../models/travel-status.enum';

describe('TravelListCardComponent', () => {
    let component: TravelListCardComponent;
    let fixture: ComponentFixture<TravelListCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule
            ],
            declarations: [TravelListCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TravelListCardComponent);
        component = fixture.componentInstance;
        component.travel = {
            id: 1,
            from: 'mock',
            to: 'mock',
            driver: { id: 1, email: 'mock@email.com', firstName: 'mock', lastName: 'mock', profileSettings: { id: 1, emailVisible: false } },
            departureDate: new Date(),
            status: TravelStatusEnum.PENDING,
            passengers: [],
            applied: false
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
