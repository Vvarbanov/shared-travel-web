import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Profile } from '../../../profile/models/profile.model';
import { PROFILE_MODULE_URL } from '../../constants';

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

    constructor(
        private router: Router,
        private dialog: MatDialog,
    ) { }

    viewProfile(): void {
        this.dialog.closeAll();
        this.router.navigateByUrl(`${ PROFILE_MODULE_URL }/${ this.profile.id }`);
    }
}
