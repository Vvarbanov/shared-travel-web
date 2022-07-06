import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RedirectService } from 'src/app/core/services/redirects/redirect.service';
import { Profile } from 'src/app/profile/models/profile.model';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { PAGINATION_OPTIONS } from '../../core/constants';
import { Page } from '../../core/models/page.model';
import { FindTravelComponent } from '../find-travel/find-travel.component';
import { FindTravelService } from '../find-travel/services/find-travel.service';
import { Travel } from './models/travel.model';
import { TravelListService } from './services/travel-list.service';

@Component({
    selector: 'app-travel-list',
    templateUrl: './travel-list.component.html',
    styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit, AfterViewInit, OnDestroy {
    private subscriptions = new Subscription();
    readonly pageOptions = PAGINATION_OPTIONS;
    showSpinner = true;

    travelsPage: Page<Travel> | undefined;
    profile: Profile | null | undefined;

    @ViewChild(FindTravelComponent) findTravelComponent: FindTravelComponent | undefined;

    constructor(
        private route: ActivatedRoute,
        private redirectService: RedirectService,
        private findTravelService: FindTravelService,
        private travelListService: TravelListService,
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(
            this.profileService.currentProfileObs?.subscribe(profile => {
                this.profile = profile;
            })
        );

        this.subscriptions.add(
            this.findTravelService.travelPageObs.subscribe(travels => {
                if (!travels) return;

                this.showSpinner = false;
                this.travelsPage = travels;
            })
        );

        this.subscriptions.add(
            this.route.queryParams.subscribe(params => {
                this.travelListService.populateLocalFilter(params);
            })
        );
    }

    ngAfterViewInit(): void {
        if (!this.findTravelComponent) return;

        this.travelListService.populateFindTravelComponent(this.findTravelComponent);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onPageChange(pageEvent: PageEvent): void {
        this.showSpinner = true;
        this.findTravelService.findTravelsPage(pageEvent);
    }

    goToHome(): void {
        this.redirectService.navigateHome();
    }
}
