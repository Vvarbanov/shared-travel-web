/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DriverTravelHistoryComponent } from './driver-travel-history.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DriverTravelHistoryComponent', () => {
    let component: DriverTravelHistoryComponent;
    let fixture: ComponentFixture<DriverTravelHistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DriverTravelHistoryComponent],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: MatDialog, useValue: {} },
                { provide: DatePipe, useValue: new DatePipe('en') }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DriverTravelHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
