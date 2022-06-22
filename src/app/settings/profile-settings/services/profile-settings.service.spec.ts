/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileSettingsService } from './profile-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: ProfileSettings', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProfileSettingsService]
        });
    });

    it('should ...', inject([ProfileSettingsService], (service: ProfileSettingsService) => {
        expect(service).toBeTruthy();
    }));
});
