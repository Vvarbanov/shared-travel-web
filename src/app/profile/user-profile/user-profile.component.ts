import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../models/profile.model';
import { ProfileHttpService } from '../../core/services/http/profile-http.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    profile: Profile | undefined;

    constructor(
        private route: ActivatedRoute,
        private profileHttpService: ProfileHttpService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.profileHttpService.getProfileById(params['id']).subscribe({
                next: res => {
                    this.profile = res;
                }, error: e => console.error(e)
            });
        });
    }

    getFullName(): string {
        return `${ this.profile?.firstName } ${ this.profile?.lastName }`;
    }
}
