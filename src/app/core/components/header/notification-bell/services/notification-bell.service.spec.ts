/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { NotificationBellService } from './notification-bell.service';

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
