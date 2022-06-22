/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateService } from './date.service';
import { DatePipe } from '@angular/common';

describe('Service: Date', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DateService,
                { provide: DatePipe, useValue: new DatePipe('en') }
            ]
        });
    });

    it('should ...', inject([DateService], (service: DateService) => {
        expect(service).toBeTruthy();
    }));
});
