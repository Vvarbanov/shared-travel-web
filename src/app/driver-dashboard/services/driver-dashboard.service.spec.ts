/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverDashboardService } from './driver-dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: DriverDashboard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DriverDashboardService]
        });
    });

    it('should ...', inject([DriverDashboardService], (service: DriverDashboardService) => {
        expect(service).toBeTruthy();
    }));
});
