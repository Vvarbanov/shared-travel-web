import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { TravelDetailsDialogService } from './travel-details-dialog.service';
import { ProfileService } from '../../../profile/services/profile.service';

describe('TravelDetailsDialogServiceService', () => {
    let service: TravelDetailsDialogService;

    beforeEach(() => {
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
            ]
        });
        service = TestBed.inject(TravelDetailsDialogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
