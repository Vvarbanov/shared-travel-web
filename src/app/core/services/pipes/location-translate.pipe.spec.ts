/* tslint:disable:no-unused-variable */
import { inject } from '@angular/core/testing';

import { LocationsService } from '../locations/locations.service';
import { LocationTranslatePipe } from './location-translate.pipe';

describe('Pipe: LocationTranslatee', () => {
    it('create an instance', inject([LocationsService], (locationsService: LocationsService) => {
        const pipe = new LocationTranslatePipe(locationsService);
        expect(pipe).toBeTruthy();
    }));
});
