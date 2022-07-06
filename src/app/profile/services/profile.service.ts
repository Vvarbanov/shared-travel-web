import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    private fetchingFromServer = true;

    private currentProfileSubject = new BehaviorSubject<Profile | null>(null);
    get currentProfileObs(): Observable<Profile | null> {
        return this.currentProfileSubject.asObservable();
    }

    constructor(
        private profileHttpService: ProfileHttpService,
        private localStorageService: LocalStorageService,
        private eventBroker: EventBrokerService
    ) {
        this.initProfile();

        this.eventBroker.getEvent(Events.loginSuccessful)?.subscribe(() => {
            this.saveCustomerFromServerData();
        });

        this.eventBroker.getEvent(Events.logoutSuccessful)?.subscribe(() => {
            this.clearProfile();
        });
    }

    private initProfile(): void {
        setTimeout(() => {
            if (this.fetchingFromServer) {
                this.updateProfile(this.getProfile());
            }
        }, 0);
    }

    updateProfile(profile: Profile): void {
        this.currentProfileSubject.next(profile);
        this.saveProfileToLocalStorage(profile);
    }

    private getProfile(): Profile {
        const profileJSON = this.localStorageService.get(PROFILE_TOKEN_KEY);

        if (!profileJSON) {
            throw new Error("No profile found!");
        }

        return JSON.parse(profileJSON);
    }

    private saveCustomerFromServerData(): void {
        this.fetchingFromServer = false;
        this.profileHttpService.getCurrentProfile().subscribe({
            next: res => this.updateProfile(res),
            error: err => console.error(err)
        });
    }

    private saveProfileToLocalStorage(profile: Profile): void {
        this.localStorageService.set(PROFILE_TOKEN_KEY, JSON.stringify(profile));
    }

    private clearProfile(): void {
        this.currentProfileSubject.next(null);
        this.localStorageService.remove(PROFILE_TOKEN_KEY);
    }
}
