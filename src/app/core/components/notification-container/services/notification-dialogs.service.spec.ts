/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationDialogsService } from './notification-dialogs.service';
import { DatePipe } from '@angular/common';

describe('Service: NotificationDialogs', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NotificationDialogsService,
                { provide: DatePipe, useValue: new DatePipe('en') }
            ]
        });
    });

    it('should ...', inject([NotificationDialogsService], (service: NotificationDialogsService) => {
        expect(service).toBeTruthy();
    }));
});
