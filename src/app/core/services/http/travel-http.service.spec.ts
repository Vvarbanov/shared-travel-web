/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelHttpService } from './travel-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: TravelHttp', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TravelHttpService]
        });
    });

    it('should ...', inject([TravelHttpService], (service: TravelHttpService) => {
        expect(service).toBeTruthy();
    }));
});
