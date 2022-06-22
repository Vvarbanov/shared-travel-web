import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthenticationHttpService } from './authentication-http.service';

describe('AuthenticationHttpService', () => {
    let service: AuthenticationHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(AuthenticationHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
