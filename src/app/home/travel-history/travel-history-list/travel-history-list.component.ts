import { Component, Input } from '@angular/core';
import { Travel } from '../../travel-list/models/travel.model';
import { TravelDetailsDialogService } from '../../travel-details-dialog/services/travel-details-dialog.service';

@Component({
    selector: 'app-travel-history-list',
    templateUrl: './travel-history-list.component.html',
    styleUrls: ['./travel-history-list.component.scss']
})
export class TravelHistoryListComponent {
    @Input()
    title = '';
    @Input()
    travels: Travel[] = [];

    constructor(private travelDetailsDialogService: TravelDetailsDialogService) { }

    openTravelDetails(travel: Travel): void {
        this.travelDetailsDialogService.openTravelDetails(travel);
    }
}
