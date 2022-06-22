import { Injectable } from '@angular/core';
import { Travel } from 'src/app/home/travel-list/models/travel.model';
import { TravelHttpService } from '../../core/services/http/travel-http.service';

@Injectable({
    providedIn: 'root'
})
export class DriverDashboardService {

    constructor(private travelHttpService: TravelHttpService) { }

    getDriverTravels(inFuture: boolean, saveVariable: Travel[]): void {
        this.travelHttpService.getMyTravels(true, inFuture).subscribe({
            next: res => {
                saveVariable.push(...res.content);
            }, error: e => console.error(e)
        });
    }
}
