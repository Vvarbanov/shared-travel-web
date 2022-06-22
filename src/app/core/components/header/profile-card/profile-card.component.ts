import { Component, OnDestroy, OnInit } from '@angular/core';
import { SETTINGS_ROUTER_URL, MY_PROFILE_ROUTER_URL, PROFILE_TOKEN_KEY } from '../../../constants';
import { Language } from '../../../services/language/model/language.model';
import { LanguageService } from '../../../services/language/language.service';
import { RedirectService } from 'src/app/core/services/redirects/redirect.service';
import { Subscription } from 'rxjs';
import { EventBrokerService } from 'src/app/core/services/events/event-broker.service';
import { Events } from 'src/app/core/models/events.model';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    readonly MENU_URLS = {
        settings: SETTINGS_ROUTER_URL,
        myProfile: MY_PROFILE_ROUTER_URL
    };
    readonly languages: Language[];

    name!: string;

    constructor(
        private redirectService: RedirectService,
        private languageService: LanguageService,
        private profileService: ProfileService,
        private authenticationService: AuthenticationService,
        private eventBroker: EventBrokerService
    ) {
        this.languages = this.languageService.getLanguages();
    }

    ngOnInit(): void {
        this.updateProfileName();

        this.subscriptions.add(
            this.eventBroker.getEvent(Events.profileDataUpdated)?.subscribe(() => this.updateProfileName())
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private updateProfileName(): void {
        try {
            const profile = this.profileService.getProfile();

            this.name = profile.firstName + " " + profile.lastName;
        } catch {
            console.error("No user logged in yet!");
        }
    }

    navigate(url: string): void {
        this.redirectService.navigateToUrl(url);
    }

    languageRedirect(code: string): string {
        return this.languageService.getLanguageUrl(code);
    }

    logout(): void {
        this.authenticationService.logout();
    }
}
