import { Component, Input } from '@angular/core';
import { TravelFilter } from '../../../../home/find-travel/models/travel-filter.model';
import { Router } from '@angular/router';
import { DRIVER_DASHBOARD_ROUTER_URL } from '../../../../core/constants';
import { TravelHttpService } from '../../../../core/services/http/travel-http.service';

@Component({
    selector: 'app-review-step',
    templateUrl: './review-step.component.html',
    styleUrls: ['./review-step.component.scss']
})
export class ReviewStepComponent {
    @Input() travelObject: TravelFilter;

    constructor(
        private router: Router,
        private travelHttpService: TravelHttpService,
    ) {
        this.travelObject = { from: '', to: '', departureDate: new Date() };
    }

    submit(): void {
        this.travelHttpService.createTravel(this.travelObject).subscribe({
            next: _ => {
                this.router.navigateByUrl(DRIVER_DASHBOARD_ROUTER_URL);
            }, error: e => console.error(e)
        });
    }
}
