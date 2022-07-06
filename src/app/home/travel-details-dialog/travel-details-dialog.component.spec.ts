/* tslint:disable:no-unused-variable */
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BoldTextPipeModule } from '../../core/services/pipes/bold-text.pipe';
import { LocationTranslatePipeModule } from '../../core/services/pipes/location-translate.pipe';
import { ProfileService } from '../../profile/services/profile.service';
import { TravelDetailsDialogComponent } from './travel-details-dialog.component';

describe('TravelDetailsDialogComponent', () => {
    let component: TravelDetailsDialogComponent;
    let fixture: ComponentFixture<TravelDetailsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                BoldTextPipeModule,
                LocationTranslatePipeModule
            ],
            declarations: [TravelDetailsDialogComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { notifications: [], travel: { driver: { id: 1 }, departureDate: new Date(), vehicle: {} }, title: '', message: '' } },
                { provide: MatDialogRef, useValue: {} },
                { provide: DatePipe, useValue: new DatePipe('en') },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile']);
        profileServiceSpy.getProfile.and.returnValue({});

        TestBed.configureTestingModule({
            providers: [{
                provide: ProfileService,
                useValue: profileServiceSpy
            }]
        });

        fixture = TestBed.createComponent(TravelDetailsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
