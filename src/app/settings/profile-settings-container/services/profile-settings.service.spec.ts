/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ProfileSettingsService } from './profile-settings.service';

describe('Service: Settings', () => {
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
