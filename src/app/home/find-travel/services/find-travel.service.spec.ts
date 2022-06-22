/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FindTravelService } from './find-travel.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: FindTravel', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FindTravelService],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ]
        });
    });

    it('should ...', inject([FindTravelService], (service: FindTravelService) => {
        expect(service).toBeTruthy();
    }));
});
