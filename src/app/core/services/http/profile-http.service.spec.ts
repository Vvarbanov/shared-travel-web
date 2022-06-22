/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileHttpService } from './profile-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: ProfileHttp', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProfileHttpService]
        });
    });

    it('should ...', inject([ProfileHttpService], (service: ProfileHttpService) => {
        expect(service).toBeTruthy();
    }));
});
