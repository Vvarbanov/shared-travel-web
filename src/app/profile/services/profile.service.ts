import { Injectable } from '@angular/core';
import { PROFILE_TOKEN_KEY } from 'src/app/core/constants';
import { Events } from 'src/app/core/models/events.model';
import { EventBrokerService } from 'src/app/core/services/events/event-broker.service';
import { ProfileHttpService } from 'src/app/core/services/http/profile-http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { Profile } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private profileHttpService: ProfileHttpService,
        private localStorageService: LocalStorageService,
        private eventBroker: EventBrokerService
    ) { }

    getProfile(): Profile {
        const profileJSON = this.localStorageService.get(PROFILE_TOKEN_KEY);

        if (!profileJSON) {
            throw new Error("No profile found!");
        }
        return JSON.parse(profileJSON);
    }

    saveCustomerProfile(): void {
        if (this.profileNotSaved()) {
            return;
        }

        this.saveCustomerFromServerData();
    }

    saveCustomerFromServerData(): void {
        this.profileHttpService.getCurrentProfile().subscribe({
            next: res => {
                this.saveProfileToLocalStorage(res);
                this.eventBroker.publishEvent(Events.profileDataUpdated);
            }
        });
    }

    saveProfileToLocalStorage(profile: Profile): void {
        this.localStorageService.set(PROFILE_TOKEN_KEY, JSON.stringify(profile));
    }

    profileNotSaved(): boolean {
        return !this.isBlank(this.localStorageService.get(PROFILE_TOKEN_KEY));
    }

    isBlank(str: string | null): boolean {
        return (!str || /^\s*$/.test(str));
    }

}
