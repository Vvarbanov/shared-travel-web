import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationHttpService } from '../../../services/http/notification-http.service';
import { JoinRequestNotificationStatus } from '../models/join-request-notification-status.enum';
import { JoinRequestDialogData } from '../models/join-request-dialog-data.model';
import { JoinRequestNotification } from '../models/join-request-notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from 'src/app/profile/models/profile.model';
import { TravelHttpService } from 'src/app/core/services/http/travel-http.service';

@Component({
    selector: 'app-travel-details-dialog',
    templateUrl: './travel-details-dialog.component.html',
    styleUrls: ['./travel-details-dialog.component.scss']
})
export class TravelDetailsDialogComponent {
    JoinRequestStatus: typeof JoinRequestNotificationStatus = JoinRequestNotificationStatus;

    constructor(
        private notificationHttpService: NotificationHttpService,
        private travelHttpService: TravelHttpService,
        @Inject(MAT_DIALOG_DATA) public dialogData: JoinRequestDialogData,
        private snackBar: MatSnackBar
    ) { }

    kickPassenger(passenger: Profile): void {
        this.travelHttpService.kickPassenger(this.dialogData.travel, passenger).subscribe({
            next: () => {
                this.dialogData.travel.passengers = this.dialogData.travel.passengers.filter(p => p !== passenger);
                this.snackBar.open($localize`:@@join-request-dialog.snackbar.kick:You have successfully kicked the passenger!`,
                    $localize`:@@join-request-dialog.snackbar.close:Close`, {
                    duration: 3000
                });
            },
            error: e => console.error(e)
        });
    }

    handlePending(notification: JoinRequestNotification, $event: boolean): void {
        $event ? this.accept(notification) : this.reject(notification);
    }

    private accept(notification: JoinRequestNotification): void {
        this.notificationHttpService.acceptJoinRequestNotification(notification.id)
            .subscribe({
                next: () => {
                    notification.status = JoinRequestNotificationStatus.APPROVED;
                    this.dialogData.travel.passengers.push(notification.passenger);
                    this.snackBar.open($localize`:@@join-request-dialog.snackbar.approve:You have successfully approved the application!`,
                        $localize`:@@join-request-dialog.snackbar.close:Close`, {
                        duration: 3000
                    });
                },
                error: e => console.error(e)
            });
    }

    private reject(notification: JoinRequestNotification): void {
        this.notificationHttpService.rejectJoinRequestNotification(notification.id)
            .subscribe({
                next: () => {
                    notification.status = JoinRequestNotificationStatus.REJECTED;
                    this.snackBar.open($localize`:@@join-request-dialog.snackbar.reject:You have successfully rejected the application!`,
                        $localize`:@@join-request-dialog.snackbar.close:Close`, {
                        duration: 3000
                    });
                },
                error: e => console.error(e)
            });
    }
}
