/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelListService } from './travel-list.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: TravelList', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TravelListService],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ]
        });
    });

    it('should ...', inject([TravelListService], (service: TravelListService) => {
        expect(service).toBeTruthy();
    }));
});
