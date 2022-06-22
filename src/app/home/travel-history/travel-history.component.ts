import { Component, OnInit } from '@angular/core';
import { Travel } from '../travel-list/models/travel.model';
import { Page } from '../../core/models/page.model';
import { TravelHttpService } from '../../core/services/http/travel-http.service';

@Component({
    selector: 'app-travel-history',
    templateUrl: './travel-history.component.html',
    styleUrls: ['./travel-history.component.scss']
})
export class TravelHistoryComponent implements OnInit {
    pastTravels: Page<Travel> | undefined;

    constructor(private travelHttpService: TravelHttpService) { }

    ngOnInit(): void {
        this.getMyPastTravels();
    }

    getMyPastTravels(): void {
        this.travelHttpService.getMyPastTravels(false, false).subscribe({
            next: res => {
                this.pastTravels = res;
            }, error: e => console.error(e)
        });
    }
}
