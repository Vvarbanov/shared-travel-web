import { Component, Input, OnInit } from '@angular/core';
import { Travel } from '../travel-list/models/travel.model';
import { TravelHistoryContainerService } from './services/travel-history-container.service';

@Component({
    selector: 'app-travel-history-container',
    templateUrl: './travel-history-container.component.html',
    styleUrls: ['./travel-history-container.component.scss']
})
export class TravelHistoryContainerComponent implements OnInit {

    @Input()
    driverOnly = false;

    pastTravels: Travel[] = [];
    futureTravels: Travel[] = [];

    constructor(private travelHistoryContainerService: TravelHistoryContainerService) { }

    ngOnInit(): void {
        this.travelHistoryContainerService.getTravels(this.pastTravels, this.driverOnly, false);
        this.travelHistoryContainerService.getTravels(this.futureTravels, this.driverOnly, true);
    }
}
