/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationContainerService } from './notification-container.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('Service: NotificationContainer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                NotificationContainerService,
                { provide: MatDialog, useValue: {} },
                { provide: DatePipe, useValue: new DatePipe('en') }
            ]
        });
    });

    it('should ...', inject([NotificationContainerService], (service: NotificationContainerService) => {
        expect(service).toBeTruthy();
    }));
});
