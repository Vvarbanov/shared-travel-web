import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { TravelDetailsDialogService } from './travel-details-dialog.service';

describe('TravelDetailsDialogServiceService', () => {
    let service: TravelDetailsDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
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
