import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import LocationsBg from "../../../../assets/locations/locations-bg.json";
import LocationsEn from "../../../../assets/locations/locations-en.json";
import { AUTOCOMPLETE_MAX_FIELDS } from '../../constants';

import { TravelLocation } from '../../models/travel-location.model';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private locationsMap: Map<string, Map<string, TravelLocation>> = new Map();
    private allLocations: TravelLocation[] = [];

    constructor(@Inject(LOCALE_ID) private localeId: string) {
        this.locationsMap
            .set('bg', this.getMapFromArray(LocationsBg))
            .set('en', this.getMapFromArray(LocationsEn));

        this.fillAllLocations();
    }

    private getMapFromArray(locations: TravelLocation[]): Map<string, TravelLocation> {
        return locations.reduce((map: Map<string, TravelLocation>, location: TravelLocation) => (map.set(location.code, location)), new Map());
    }

    fillAllLocations(): void {
        const primaryLocation = this.locationsMap.get(this.localeId);
        if (primaryLocation) {
            this.allLocations.push(...primaryLocation.values());
        }

        this.locationsMap.forEach((locations: Map<string, TravelLocation>, code: string) => {
            if (code !== this.localeId || !primaryLocation) {
                this.allLocations.push(...locations.values());
            }
        });
    }

    getFilteredLocations(filter: string): TravelLocation[] {
        if (filter.length < 3) {
            return [];
        }

        const filterValue = filter.toLocaleLowerCase().trim();

        return this.allLocations.filter(option => {
            return option.name.toLowerCase().includes(filterValue);
        }).slice(0, AUTOCOMPLETE_MAX_FIELDS);
    }

    getAllLocations(): TravelLocation[] {
        return this.allLocations;
    }

    getLocationByCode(code: string): TravelLocation | undefined {
        return this.locationsMap.get(this.localeId)?.get(code);
    }

    getLocationNameByCode(code: string): string | undefined {
        return this.getLocationByCode(code)?.name;
    }
}
