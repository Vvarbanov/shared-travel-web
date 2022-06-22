/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationHttpService } from './notification-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: NotificationHttp', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NotificationHttpService]
        });
    });

    it('should ...', inject([NotificationHttpService], (service: NotificationHttpService) => {
        expect(service).toBeTruthy();
    }));
});
