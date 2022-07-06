/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelHistoryContainerService } from './travel-history-container.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: TravelHistoryContainer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TravelHistoryContainerService]
        });
    });

    it('should ...', inject([TravelHistoryContainerService], (service: TravelHistoryContainerService) => {
        expect(service).toBeTruthy();
    }));
});
