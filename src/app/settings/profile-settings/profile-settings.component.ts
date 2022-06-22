import { Component, OnInit } from '@angular/core';
import { ProfileSettings } from './models/profile-settings.model';
import { ProfileSettingsService } from './services/profile-settings.service';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
    profileSettings: ProfileSettings | undefined;

    constructor(
        private profileSettingsService: ProfileSettingsService,
    ) { }

    ngOnInit(): void {
        this.profileSettingsService.getProfileSettingsById().subscribe({
            next: res => {
                this.profileSettings = res;
            }, error: e => console.error(e)
        });
    }

    updateSetting(property: string, value: boolean): void {
        const updateObject = { [property]: value };

        this.updateProfileSetting(updateObject);
    }

    updateProfileSetting(updateObject: {}): void {
        if (!this.profileSettings) return;

        this.profileSettingsService.patchProfileSettingsById(updateObject).subscribe({
            next: res => {
                console.error(res);
            }, error: e => console.error(e)
        });
    }
}
