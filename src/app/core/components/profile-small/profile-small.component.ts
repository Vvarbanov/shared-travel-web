import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../../profile/models/profile.model';

@Component({
    selector: 'app-profile-small',
    templateUrl: './profile-small.component.html',
    styleUrls: ['./profile-small.component.scss']
})
export class ProfileSmallComponent {

    @Input()
    profile!: Profile;
    @Input()
    showButtons = false;

    @Input()
    showOnlyCancel = false;

    @Output()
    eventResponse = new EventEmitter<boolean>();

    constructor() {

    }
}
