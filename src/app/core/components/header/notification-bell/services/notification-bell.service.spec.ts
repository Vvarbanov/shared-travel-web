/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationBellService } from './notification-bell.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: NotificationBell', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NotificationBellService]
        });
    });

    it('should ...', inject([NotificationBellService], (service: NotificationBellService) => {
        expect(service).toBeTruthy();
    }));
});
