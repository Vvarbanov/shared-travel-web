import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TravelDetailsDialogComponent } from 'src/app/core/components/notification-container/travel-details-dialog/travel-details-dialog.component';
import { JoinRequestNotification } from 'src/app/core/components/notification-container/models/join-request-notification.model';
import { DateService } from 'src/app/core/services/date/date.service';
import { NotificationHttpService } from 'src/app/core/services/http/notification-http.service';
import { TravelStatusEnum } from 'src/app/home/travel-list/models/travel-status.enum';
import { Travel } from 'src/app/home/travel-list/models/travel.model';

@Injectable({
    providedIn: 'root'
})
export class TravelDetailsDialogService {

    constructor(private dialog: MatDialog,
        private dateService: DateService,
        private notificationHttpService: NotificationHttpService) { }


    openTravelDetails(travel: Travel): void {
        if (travel.status === TravelStatusEnum.PENDING && travel.departureDate.getTime() > new Date().getTime()) {
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
        const message = $localize`:@@notification-container-service.ts.join-request-dialog.message:
        The travel departs from *${ travel.from }*,
        heads for *${ travel.to }*,
        scheduled for *${ this.dateService.formatDateLongPretty(travel.departureDate) }*`;
        const title = $localize`:@@travel-details-dialog.html.dialog-title:Travel Details`;
        this.dialog.open(TravelDetailsDialogComponent, { data: { notifications: joinRequests, travel: travel, title, message } });
    }
}
