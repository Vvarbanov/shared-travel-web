/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDetailsDialogComponent } from './travel-details-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BoldTextPipe } from '../../../services/pipes/bold-text.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TravelDetailsDialogComponent', () => {
    let component: TravelDetailsDialogComponent;
    let fixture: ComponentFixture<TravelDetailsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule
            ],
            declarations: [TravelDetailsDialogComponent, BoldTextPipe],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { notifications: [], travel: {}, title: '', message: '' } },
                { provide: MatDialogRef, useValue: {} },
                { provide: DatePipe, useValue: new DatePipe('en') },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TravelDetailsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
