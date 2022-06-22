import { TestBed } from '@angular/core/testing';

import { EventBrokerService } from './event-broker.service';

describe('EventBrokerService', () => {
    let service: EventBrokerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EventBrokerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
