import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CREATE_TRAVEL_ROUTER_URL } from '../core/constants';
import { Travel } from '../home/travel-list/models/travel.model';
import { DriverDashboardService } from './services/driver-dashboard.service';

@Component({
    selector: 'app-driver-dashboard',
    templateUrl: './driver-dashboard.component.html',
    styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent implements OnInit {

    pastTravels: Travel[] = [];
    futureTravels: Travel[] = [];

    constructor(
        private router: Router,
        private driverDashboardService: DriverDashboardService
    ) { }

    ngOnInit(): void {
        this.driverDashboardService.getDriverTravels(false, this.pastTravels);
        this.driverDashboardService.getDriverTravels(true, this.futureTravels);
    }

    navigateToCreateTravel(): void {
        this.router.navigateByUrl(CREATE_TRAVEL_ROUTER_URL);
    }
}
