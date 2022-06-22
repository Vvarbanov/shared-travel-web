import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { EventBrokerService } from 'src/app/core/services/events/event-broker.service';
import { Events } from 'src/app/core/models/events.model';
import { ProfileService } from '../services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../../authentication/components/password-change-dialog/password-change-dialog.component';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

    profile: Profile | undefined;

    constructor(
        private profileService: ProfileService,
        private eventBroker: EventBrokerService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.profile = this.profileService.getProfile();
    }

    changePassword(): void {
        this.dialog.open(PasswordChangeDialogComponent);
    }

    updateProperty(property: string, value: string): void {
        switch (property) {
            case 'email':
                this.profile!.email = value;
                this.updateLocalStorageProfile();
                break;
            case 'firstName':
                this.profile!.firstName = value;
                this.updateLocalStorageProfile();
                break;
            case 'lastName':
                this.profile!.lastName = value;
                this.updateLocalStorageProfile();
                break;
            default:
                console.error('Wrong property!');
        }
    }

    private updateLocalStorageProfile(): void {
        this.profileService.saveProfileToLocalStorage(this.profile!);
        this.eventBroker.publishEvent(Events.profileDataUpdated);
    }
}
