import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { TravelFilter } from '../../find-travel/models/travel-filter.model';
import { FindTravelService } from '../../find-travel/services/find-travel.service';
import { FindTravelComponent } from '../../find-travel/find-travel.component';

@Injectable({
    providedIn: 'root'
})
export class TravelListService {
    private travelsFilter: TravelFilter;

    constructor(private findTravelService: FindTravelService) {
        this.travelsFilter = { from: '', to: '', departureDate: new Date() };
    }

    populateFindTravelComponent(findTravelComponent: FindTravelComponent): void {
        if (!this.travelsFilter) return;

        findTravelComponent?.updateFields(this.travelsFilter);
    }

    populateLocalFilter(params: Params): void {
        this.travelsFilter.from = params['from'];
        this.travelsFilter.to = params['to'];
        this.travelsFilter.departureDate = new Date(+params['startDateTime']);

        if (this.travelsFilter.from && this.travelsFilter.to && this.isValidDate(this.travelsFilter.departureDate)) {
            this.findTravelsFromLocalFilter();
        } else {
            this.travelsFilter = this.findTravelService.checkIfFilterAvailable() as TravelFilter;
            if (this.travelsFilter) {
                this.findTravelsFromLocalFilter();
            }
        }
    }

    private isValidDate(date: Date): boolean {
        return date && !isNaN(date.valueOf());
    }

    private findTravelsFromLocalFilter(): void {
        this.findTravelService.findTravels(this.travelsFilter).subscribe();
    }
}
