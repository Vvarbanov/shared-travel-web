import { Component, OnInit } from '@angular/core';
import { ProfileSettings } from '../models/profile-settings.model';
import { ProfileSettingsService } from './services/profile-settings.service';

@Component({
    selector: 'app-profile-settings-container',
    templateUrl: './profile-settings-container.component.html',
    styleUrls: ['./profile-settings-container.component.scss']
})
export class ProfileSettingsContainerComponent implements OnInit {
    profileSettings: ProfileSettings | undefined;

    constructor(
        private settingsService: ProfileSettingsService,
    ) { }

    ngOnInit(): void {
        this.settingsService.getProfileSettingsById().subscribe({
            next: res => this.profileSettings = res,
            error: e => console.error(e)
        });
    }

    updateSetting(property: string, value: boolean): void {
        const updateObject = { [property]: value };

        this.updateProfileSetting(updateObject);
    }

    updateProfileSetting(updateObject: {}): void {
        if (!this.profileSettings) return;

        this.settingsService.patchProfileSettingsById(updateObject).subscribe({
            next: res => this.profileSettings = res,
            error: e => console.error(e)
        });
    }
}
