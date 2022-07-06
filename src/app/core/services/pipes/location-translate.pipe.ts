import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';
import { LocationsService } from '../locations/locations.service';

@Pipe({
    name: 'locationTranslate'
})
@Injectable({
    providedIn: 'root'
})
export class LocationTranslatePipe implements PipeTransform {

    constructor(private locationsService: LocationsService) { }

    transform(locationCode: string): string | undefined {
        return this.locationsService.getLocationNameByCode(locationCode);
    }
}

@NgModule({
    declarations: [LocationTranslatePipe],
    exports: [LocationTranslatePipe]
})
export class LocationTranslatePipeModule { }