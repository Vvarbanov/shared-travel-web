/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Service: Language', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [LanguageService]
        });
    });

    it('should ...', inject([LanguageService], (service: LanguageService) => {
        expect(service).toBeTruthy();
    }));
});
