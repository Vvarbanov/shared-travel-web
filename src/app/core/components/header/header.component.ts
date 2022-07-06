import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthorityEnum } from 'src/app/authentication/models/authority.enum';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { AUTH_TOKEN_KEY, BASE_ROUTER_URL, DRIVER_DASHBOARD_MODULE_URL, DRIVER_DASHBOARD_ROUTER_URL } from '../../constants';
import { Events } from '../../models/events.model';
import { EventBrokerService } from '../../services/events/event-broker.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { RedirectService } from '../../services/redirects/redirect.service';
import { RegisterDriverDialogComponent } from '../register-driver-dialog/register-driver-dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private readonly TEXT_OPTIONS = {
        driver: $localize`:@@header.ts.button.driver:Driver`,
        passenger: $localize`:@@header.ts.button.passenger:Passenger`
    };
    private readonly URL_OPTIONS = {
        driver: DRIVER_DASHBOARD_ROUTER_URL,
        passenger: BASE_ROUTER_URL
    };

    private subscriptions = new Subscription();

    buttonUrl: string;
    buttonText: string;
    userAuthenticated: boolean;

    constructor(
        private location: Location,
        private redirectService: RedirectService,
        private localStorageService: LocalStorageService,
        private eventService: EventBrokerService,
        private authenticationService: AuthenticationService,
        private dialog: MatDialog
    ) {
        this.buttonUrl = this.locationIncludesDriverDashboard() ? this.URL_OPTIONS.passenger : this.URL_OPTIONS.driver;
        this.buttonText = this.locationIncludesDriverDashboard() ? this.TEXT_OPTIONS.passenger : this.TEXT_OPTIONS.driver;
        this.userAuthenticated = false;
    }

    ngOnInit(): void {
        this.userAuthenticated = this.localStorageService.get(AUTH_TOKEN_KEY) ? true : false;
        this.subscriptions.add(
            this.eventService.getEvent(Events.loginSuccessful)?.subscribe(() => {
                this.resetButton();
                this.userAuthenticated = true;
            })
        );
        this.subscriptions.add(
            this.eventService.getEvent(Events.logoutSuccessful)?.subscribe(() => {
                this.userAuthenticated = false;
                this.resetButton();
            }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private locationIncludesDriverDashboard(): boolean {
        return this.location.path().includes(DRIVER_DASHBOARD_MODULE_URL);
    }

    goHome(): void {
        this.resetButton();
        this.navigateToUrl(BASE_ROUTER_URL);
    }

    goToLogin(): void {
        this.resetButton();
        this.redirectService.navigateLogin();
    }

    changeDashboard(): void {
        if (this.authenticationService.hasAuthority(AuthorityEnum.DRIVER)) {
            this.navigateToUrl(this.buttonUrl);
            this.updateButton();

            return;
        }

        this.dialog.open(RegisterDriverDialogComponent);
    }

    private navigateToUrl(url: string): void {
        this.redirectService.navigateToUrl(url);
    }

    private updateButton(): void {
        this.buttonText = this.buttonText === this.TEXT_OPTIONS.driver ?
            this.TEXT_OPTIONS.passenger : this.TEXT_OPTIONS.driver;

        this.buttonUrl = this.buttonUrl === this.URL_OPTIONS.driver ?
            this.URL_OPTIONS.passenger : this.URL_OPTIONS.driver;
    }

    private resetButton(): void {
        this.buttonUrl = this.URL_OPTIONS.driver;
        this.buttonText = this.TEXT_OPTIONS.driver;
    }
}
