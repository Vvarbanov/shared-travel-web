import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JoinRequestNotification } from 'src/app/core/components/notification-container/models/join-request-notification.model';
import { NotificationHttpService } from 'src/app/core/services/http/notification-http.service';
import { TravelDetailsDialogComponent } from 'src/app/home/travel-details-dialog/travel-details-dialog.component';
import { TravelStatusEnum } from 'src/app/home/travel-list/models/travel-status.enum';
import { Travel } from 'src/app/home/travel-list/models/travel.model';
import { Profile } from '../../../profile/models/profile.model';
import { ProfileService } from '../../../profile/services/profile.service';

@Injectable({
    providedIn: 'root'
})
export class TravelDetailsDialogService {

    profile: Profile | null | undefined;

    constructor(
        private dialog: MatDialog,
        private notificationHttpService: NotificationHttpService,
        private profileService: ProfileService,
    ) {
        this.profileService.currentProfileObs?.subscribe(profile => {
            this.profile = profile;
        });
    }

    openTravelDetails(travel: Travel): void {
        if (this.profile?.id === travel.driver.id && travel.status === TravelStatusEnum.PENDING && travel.departureDate.getTime() > new Date().getTime()) {
            this.notificationHttpService.getPendingJoinRequestsForTravel(travel.id).subscribe({
                next: requests => {
                    this.openTravelDetailsDialog(travel, requests);
                }
            });
        } else {
            this.openTravelDetailsDialog(travel, new Array<JoinRequestNotification>());
        }
    }

    private openTravelDetailsDialog(travel: Travel, joinRequests: Array<JoinRequestNotification>): void {
        const title = $localize`:@@travel-details-dialog.html.dialog-title:Travel Details`;
        this.dialog.open(TravelDetailsDialogComponent, { data: { notifications: joinRequests, travel: travel, title } });
    }
}
