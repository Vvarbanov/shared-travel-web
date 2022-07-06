/* tslint:disable:no-unused-variable */
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { travelMock } from '../../../core/mocks/travel.mock';
import { LocationTranslatePipeModule } from '../../../core/services/pipes/location-translate.pipe';
import { ProfileService } from '../../../profile/services/profile.service';
import { TravelListCardComponent } from './travel-list-card.component';

describe('TravelListCardComponent', () => {
    let component: TravelListCardComponent;
    let fixture: ComponentFixture<TravelListCardComponent>;

    beforeEach(async(() => {
        const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile']);
        profileServiceSpy.getProfile.and.returnValue({});

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                LocationTranslatePipeModule,
            ],
            providers: [{
                provide: ProfileService,
                useValue: profileServiceSpy
            },
            { provide: MatDialog, useValue: {} },
            { provide: DatePipe, useValue: new DatePipe('en') }
            ],
            declarations: [TravelListCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TravelListCardComponent);
        component = fixture.componentInstance;
        component.travel = travelMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
