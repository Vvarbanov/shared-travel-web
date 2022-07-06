import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RedirectService } from 'src/app/core/services/redirects/redirect.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { Profile } from '../../../../profile/models/profile.model';
import { MY_PROFILE_ROUTER_URL, SETTINGS_ROUTER_URL } from '../../../constants';
import { LanguageService } from '../../../services/language/language.service';
import { Language } from '../../../services/language/model/language.model';

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
    ) {
        this.languages = this.languageService.getLanguages();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.profileService.currentProfileObs?.subscribe(profile => {
                this.updateProfileName(profile);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private updateProfileName(profile: Profile | null): void {
        if (!profile) return;

        this.name = profile.firstName + " " + profile.lastName;
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
