import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { TravelLocation } from '../../models/travel-location.model';
import * as LocationsBg from "../../../../assets/locations/locations-bg.json";
import * as LocationsEn from "../../../../assets/locations/locations-en.json";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    locations: Map<string, TravelLocation[]>;
    allLocations: TravelLocation[];

    constructor(@Inject(LOCALE_ID) private localeId: string) {
        this.locations = new Map()
            .set('bg', LocationsBg)
            .set('en', LocationsEn);

        this.allLocations = [];
        this.fillAllLocations();
    }

    fillAllLocations(): void {
        const primaryLocation = this.locations.get(this.localeId);
        if (primaryLocation) {
            this.allLocations.push(...Array.from(primaryLocation));
        }

        this.locations.forEach((value: TravelLocation[], key: string) => {
            if (key !== this.localeId || !primaryLocation) {
                this.allLocations.push(...Array.from(value));
            }
        });
    }

    getAllLocations(): TravelLocation[] {
        return this.allLocations;
    }

    getLocationByCode(code: string): TravelLocation | undefined {
        return this.allLocations.find((value: TravelLocation) => value.code === code);
    }

    getLocationNameByCode(code: string): string | undefined {
        return this.getLocationByCode(code)?.name;
    }
}
