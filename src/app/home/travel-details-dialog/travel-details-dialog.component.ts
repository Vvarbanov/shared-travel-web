import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PROFILE_MODULE_URL } from 'src/app/core/constants';
import { TravelHttpService } from 'src/app/core/services/http/travel-http.service';
import { Profile } from 'src/app/profile/models/profile.model';
import { JoinRequestNotificationStatusEnum } from '../../core/components/notification-container/models/join-request-notification-status.enum';
import { JoinRequestNotification } from '../../core/components/notification-container/models/join-request-notification.model';
import { TravelDetailsDialogData } from '../../core/components/notification-container/models/travel-details-dialog-data.model';
import { DateService } from '../../core/services/date/date.service';
import { NotificationHttpService } from '../../core/services/http/notification-http.service';
import { ProfileService } from '../../profile/services/profile.service';
import { TravelStatusEnum } from '../travel-list/models/travel-status.enum';

@Component({
    selector: 'app-travel-details-dialog',
    templateUrl: './travel-details-dialog.component.html',
    styleUrls: ['./travel-details-dialog.component.scss']
})
export class TravelDetailsDialogComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    JoinRequestStatus: typeof JoinRequestNotificationStatusEnum = JoinRequestNotificationStatusEnum;
    TravelStatus: typeof TravelStatusEnum = TravelStatusEnum;

    profile: Profile | null | undefined;

    constructor(
        private notificationHttpService: NotificationHttpService,
        private travelHttpService: TravelHttpService,
        private profileService: ProfileService,
        private dateService: DateService,
        private router: Router,
        private dialogRef: MatDialogRef<TravelDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: TravelDetailsDialogData,
        private snackBar: MatSnackBar
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

    viewDriverProfile(): void {
        this.dialogRef.close();
        this.router.navigateByUrl(`${ PROFILE_MODULE_URL }/${ this.dialogData.travel.driver.id }`);
    }

    leaveTravel(): void {
        this.travelHttpService.leaveTravel(this.dialogData.travel.id).subscribe({
            next: () => {
                this.dialogData.travel.passengers = this.dialogData.travel.passengers.filter(p => p.id !== this.profile?.id);
                this.openSnackbar($localize`:@@travel-details-dialog.snackbar.leave:You have successfully left the travel!`);
            },
            error: e => console.error(e)
        });
    }

    kickPassenger(passenger: Profile): void {
        if (passenger.id === this.profile?.id) {

        }

        this.travelHttpService.kickPassenger(this.dialogData.travel.id, passenger.id).subscribe({
            next: () => {
                this.dialogData.travel.passengers = this.dialogData.travel.passengers.filter(p => p.id !== passenger.id);
                this.openSnackbar($localize`:@@travel-details-dialog.snackbar.kick:You have successfully kicked the passenger!`);
            },
            error: e => console.error(e)
        });
    }

    cancelTravel(): void {
        this.travelHttpService.cancelTravel(this.dialogData.travel.id).subscribe({
            next: _ => {
                this.openSnackbar($localize`:@@travel-details-dialog.snackbar.cancel:You have successfully cancelled the travel!`);
                this.dialogRef.close();
            }, error: e => console.error(e)
        });
    }

    handlePending(notification: JoinRequestNotification, $event: boolean): void {
        $event ? this.accept(notification) : this.reject(notification);
    }

    private accept(notification: JoinRequestNotification): void {
        this.notificationHttpService.acceptJoinRequestNotification(notification.id)
            .subscribe({
                next: () => {
                    notification.status = JoinRequestNotificationStatusEnum.APPROVED;
                    this.dialogData.travel.passengers.push(notification.passenger);
                    this.dialogData.notifications = this.dialogData.notifications.filter(n => n !== notification);
                    this.openSnackbar($localize`:@@travel-details-dialog.snackbar.approve:You have successfully approved the application!`);
                },
                error: e => console.error(e)
            });
    }

    private reject(notification: JoinRequestNotification): void {
        this.notificationHttpService.rejectJoinRequestNotification(notification.id)
            .subscribe({
                next: () => {
                    notification.status = JoinRequestNotificationStatusEnum.REJECTED;
                    this.openSnackbar($localize`:@@travel-details-dialog.snackbar.reject:You have successfully rejected the application!`);
                },
                error: e => console.error(e)
            });
    }

    formatDate(date: Date): string | null {
        return this.dateService.formatDateLongYearPretty(date);
    }

    getTravelStatus(status: TravelStatusEnum): string {
        if (!this.isTravelFuture() && this.dialogData.travel.status === TravelStatusEnum.PENDING) {
            status = TravelStatusEnum.FINISHED;
        }

        switch (status) {
            case TravelStatusEnum.PENDING:
                return $localize`:@@travel-status.pending:PENDING`;
            case TravelStatusEnum.CANCELED:
                return $localize`:@@travel-status.canceled:CANCELED`;
            case TravelStatusEnum.FINISHED:
                return $localize`:@@travel-status.finished:FINISHED`;
            default:
                console.warn('No such status found');
                return '';
        }
    }

    private openSnackbar(message: string): void {
        this.snackBar.open(message, $localize`:@@snackbar.close:Close`, { duration: 3000 });
    }

    getTimeStatus(): string {
        return this.isTravelFuture() ? $localize`:@@travel-time-status.future:FUTURE` : $localize`:@@travel-time-status.past:PAST`;
    }

    isUserDriverOrPassenger(passenger: Profile): boolean {
        return this.profile?.id === this.dialogData.travel.driver.id || passenger.id === this.profile?.id;
    }

    isUserDriver(): boolean {
        return this.profile?.id === this.dialogData.travel.driver.id;
    }

    isUserPassenger(passenger: Profile): boolean {
        return passenger.id === this.profile?.id;
    }

    isTravelPending(): boolean {
        return this.dialogData.travel.status === this.TravelStatus.PENDING;
    }

    isTravelFuture(): boolean {
        return this.dialogData.travel.departureDate.getTime() > new Date().getTime();
    }

    isTravelNotFull(): boolean {
        return this.dialogData.travel.passengers!.length < this.dialogData.travel.vehicle.seats;
    }
}
