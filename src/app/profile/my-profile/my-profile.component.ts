import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PasswordChangeDialogComponent } from '../../authentication/components/password-change-dialog/password-change-dialog.component';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    profile: Profile | null | undefined;

    constructor(
        private profileService: ProfileService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(
            this.profileService.currentProfileObs?.subscribe(profile => {
                this.profile = profile;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
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
            case 'phone':
                this.profile!.phone = value;
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
        this.profileService.updateProfile(this.profile!);
    }
}
