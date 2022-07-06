import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
    let service: ProfileService;

    beforeEach(() => {
        const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile']);
        profileServiceSpy.getProfile.and.returnValue({});

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ], providers: [{
                provide: ProfileService,
                useValue: profileServiceSpy
            }]
        });
        service = TestBed.inject(ProfileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
