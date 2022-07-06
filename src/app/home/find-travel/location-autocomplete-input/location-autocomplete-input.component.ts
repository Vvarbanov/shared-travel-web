import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AUTOCOMPLETE_MAX_FIELDS } from 'src/app/core/constants';
import { LocationsService } from 'src/app/core/services/locations/locations.service';
import { TravelLocation } from '../../../core/models/travel-location.model';

@Component({
    selector: 'app-location-autocomplete-input',
    templateUrl: './location-autocomplete-input.component.html',
    styleUrls: ['./location-autocomplete-input.component.scss']
})
export class LocationAutocompleteInputComponent implements OnInit, OnDestroy {
    @Input() labelText: string;
    @Input() placeholderText: string;
    @Input() errorMessageText: string;

    @Output() locationSelectedEvent = new EventEmitter<string>();

    subscriptions: Subscription = new Subscription();
    formControl: FormControl = new FormControl();

    filteredOptions: TravelLocation[];
    selectedLocation: string | undefined;

    constructor(private locationsService: LocationsService) {
        this.labelText = '';
        this.placeholderText = '';
        this.errorMessageText = '';

        this.filteredOptions = [];
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.formControl.valueChanges.subscribe({
                next: value => {
                    const name = this._getName(value);

                    this.filteredOptions = name ? this._filter(name) : [];
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.locationSelectedEvent.complete();
    }

    private _getName(value: any): string {
        if (typeof value === "string") {
            value = (value as string).trim();
            return value;
        }

        this.selectLocation(value.code);

        return value.name;
    }

    private _filter(value: string): TravelLocation[] {
        const locations = this.locationsService.getFilteredLocations(value);

        if (locations.length == 1 && locations[0].name === value) {
            this.selectLocation(locations[0].code);
        } else if (this.selectedLocation) {
            this.selectedLocation = undefined;
        }

        return locations;
    }

    displayFn(location: TravelLocation): string {
        return location && location.name ? location.name : '';
    }

    private selectLocation(location: string): void {
        this.selectedLocation = location;
        this.locationSelectedEvent.next(this.selectedLocation);
    }

    updateValue(value: string): void {
        this.formControl.patchValue({ name: this.locationsService.getLocationNameByCode(value) });
        this.selectLocation(value);
    }
}
