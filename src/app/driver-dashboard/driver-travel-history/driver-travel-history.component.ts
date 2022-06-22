import { Component, Input, OnInit } from '@angular/core';
import { Travel } from '../../home/travel-list/models/travel.model';
import { TravelDetailsDialogService } from '../services/travel-details-dialog.service';

@Component({
    selector: 'app-driver-travel-history',
    templateUrl: './driver-travel-history.component.html',
    styleUrls: ['./driver-travel-history.component.scss']
})
export class DriverTravelHistoryComponent {
    @Input() travels: Travel[] = [];
    @Input() title: string = '';

    constructor(private travelDetailsDialogService: TravelDetailsDialogService) {
    }

    openTravelDetails(travel: Travel): void {
        this.travelDetailsDialogService.openTravelDetails(travel);
    }
}
