import { Injectable } from '@angular/core';
import { TravelHttpService } from '../../../core/services/http/travel-http.service';
import { Travel } from '../../travel-list/models/travel.model';

@Injectable({
    providedIn: 'root'
})
export class TravelHistoryContainerService {

    constructor(private travelHttpService: TravelHttpService) { }

    getTravels(saveVariable: Travel[], driverOnly: boolean, inFuture: boolean): void {
        this.travelHttpService.getMyTravels(driverOnly, inFuture).subscribe({
            next: res => saveVariable.push(...res.content),
            error: e => console.error(e)
        });
    }
}
