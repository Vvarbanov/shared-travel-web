/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { TravelHistoryListComponent } from './travel-history-list.component';
import { ProfileService } from '../../../profile/services/profile.service';

describe('TravelHistoryListComponent', () => {
    let component: TravelHistoryListComponent;
    let fixture: ComponentFixture<TravelHistoryListComponent>;

    beforeEach(async(() => {
        const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile']);
        profileServiceSpy.getProfile.and.returnValue({});

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [{
                provide: ProfileService,
                useValue: profileServiceSpy
            },
            { provide: MatDialog, useValue: {} },
            { provide: DatePipe, useValue: new DatePipe('en') }
            ],
            declarations: [TravelHistoryListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TravelHistoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
