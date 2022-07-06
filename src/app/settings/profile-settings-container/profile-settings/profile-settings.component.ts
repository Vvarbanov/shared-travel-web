import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() icon: string = '';

    constructor() { }
}
