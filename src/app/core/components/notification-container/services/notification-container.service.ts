import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';
import { NotificationTypeEnum } from '../models/notification-type.enum';
import { JoinRequestMessageData } from '../models/join-request-message-data.model';
import { TravelDetailsDialogComponent } from '../travel-details-dialog/travel-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationHttpService } from '../../../services/http/notification-http.service';
import { DateService } from '../../../services/date/date.service';
import { NotificationDialogsService } from './notification-dialogs.service';
import { SimpleTravelNotificationData } from '../models/simple-travel-notification-data.model';
import { ReplaySubject, Observable } from 'rxjs';
import { Page } from '../../../models/page.model';
import { Pageable } from '../../../models/pageable.model';
import { PaginationService } from 'src/app/core/services/pagination/pagination.service';
import { SortDirection } from 'src/app/core/models/sort-direction';
import { TwoPersonNotificationData } from '../models/two-person-notification-data.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationContainerService {
    private pageable: Pageable;
    private last: boolean = false;

    private notificationPageSubject = new ReplaySubject<Page<Notification>>();

    constructor(
        private dialog: MatDialog,
        private notificationHttpService: NotificationHttpService,
        private notificationDialogService: NotificationDialogsService,
        private dateService: DateService,
        private paginationService: PaginationService
    ) {
        this.pageable = this.paginationService.getPage("createdDate", SortDirection.DESC);
    }

    get notificationPageObs(): Observable<Page<Notification>> {
        return this.notificationPageSubject.asObservable();
    }

    getNotifications(pageable: Pageable = { page: 0, size: 20, sort: '' }): void {
        this.pageable = pageable;
        this.notificationHttpService.getNotifications(pageable).subscribe({
            next: res => {
                this.notificationPageSubject.next(res);
                this.last = res.last;

                if (!this.last) {
                    this.pageable.page++;
                }
            }, error: e => console.error(e)
        });
    }

    getNextNotificationsPage(): void {
        if (!this.last) {
            this.getNotifications(this.pageable);
        }
    }

    clearNotifications(): void {
        this.notificationPageSubject = new ReplaySubject<Page<Notification>>();
        this.pageable = { page: 0, size: 20, sort: '' };
        this.last = false;
    }

    handleNotificationClick(notification: Notification): void {
        switch (NotificationTypeEnum[notification.type]) {
            case NotificationTypeEnum.JOIN:
                this.openJoinRequestDialog(notification);
                break;
            case NotificationTypeEnum.REQUEST_APPROVED:
            case NotificationTypeEnum.REQUEST_REJECTED:
            case NotificationTypeEnum.TRAVEL_CANCELED:
            case NotificationTypeEnum.APPLIED_TRAVEL_CANCELED:
                // This notification type has no on click functionallity
                return;
            default:
                console.error('Notification type no match');
                break;
        }
    }

    private openJoinRequestDialog(notification: Notification): void {
        this.notificationHttpService.getJoinRequestNotification(notification.id).subscribe({
            next: res => {
                const message = this.notificationDialogService.getJoinRequestDialogMessage(res);
                const title = $localize`:@@join-request-dialog.html.dialog-title:Travel Join Request`;
                this.dialog.open(TravelDetailsDialogComponent, { data: { notifications: [res], travel: res.travel, title, message } });
            }, error: e => console.error(e)
        });
    }

    getMessageForNotification(notification: Notification): string {
        switch (NotificationTypeEnum[notification.type]) {
            case NotificationTypeEnum.JOIN:
                return this.getMessageForJoinNotification(notification);
            case NotificationTypeEnum.REQUEST_APPROVED:
                return this.getMessageForAcceptRequestNotification(notification);
            case NotificationTypeEnum.REQUEST_REJECTED:
                return this.getMessageForRejectRequestNotification(notification);
            case NotificationTypeEnum.TRAVEL_CANCELED:
                return this.getMessageForTravelCanceled(notification);
            case NotificationTypeEnum.APPLIED_TRAVEL_CANCELED:
                return this.getMessageForAppliedTravelCanceled(notification);
            case NotificationTypeEnum.PASSENGER_LEFT:
                return this.getMessageForPassengerLeft(notification);
            case NotificationTypeEnum.PASSENGER_KICKED:
                return this.getMessageForPassangerKicked(notification);
            case NotificationTypeEnum.DRIVER_TRAVEL_TODAY:
                return this.getMessageForDriverTravelToday(notification);
            case NotificationTypeEnum.PASSENGER_TRAVEL_TODAY:
                return this.getMessageForPassengerTravelToday(notification);
            default:
                console.error('Notification type no match');
                return '';
        }
    }

    private getMessageForJoinNotification(notification: Notification): string {
        const messageData = this.parseMessageData<JoinRequestMessageData>(notification);
        return messageData ?
            $localize`:@@notification-container-service.ts.join-request-card.message:
        *${ messageData.passengerName }* requested to *join a travel*
        you host departing on *${ this.dateService.formatDateLongPretty(messageData.travelDate) }*` :
            '';
    }

    private getMessageForAcceptRequestNotification(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ?
            $localize`:@@notification-container-service.ts.accept-join-request-card.message:
        Join request for travel from *${ messageData.from }* to *${ messageData.to }*
                on *${ messageData.travelDate }* has been accepted!` :
            '';
    }

    private getMessageForRejectRequestNotification(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.reject-join-request-card.message:
                Join request for travel from *${ messageData.from }* to *${ messageData.to }*
                on *${ messageData.travelDate }* has been rejected!` :
            '';
    }

    private getMessageForTravelCanceled(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.travel-canceled-card.message:
                Travel from *${ messageData.from }* to *${ messageData.to }*
                on *${ messageData.travelDate }* has been canceled by the driver!` :
            '';
    }

    private getMessageForAppliedTravelCanceled(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.applied-travel-canceled-card.message:
                Travel that you have applied for, from *${ messageData.from }* to *${ messageData.to }*
                on *${ messageData.travelDate }* has been canceled by the driver!` :
            '';
    }

    private getMessageForPassengerLeft(notification: Notification): string {
        const messageData = this.parseMessageData<TwoPersonNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.passenger-left.message:
                *${ messageData.notifyingPerson }* has left your travel from *${ messageData.from }*
                to *${ messageData.to }* on *${ messageData.travelDate }*!` :
            '';

    }

    private getMessageForPassangerKicked(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.passenger-kicked.message:
                You have been removed from travel, from *${ messageData.from }* to *${ messageData.to }*
                on *${ messageData.travelDate }* by the driver!` :
            '';
    }

    private getMessageForDriverTravelToday(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.driver-travel-today.message:
                *Reminder* your travel as a *driver* from *${ messageData.from }* to *${ messageData.to }*
                is today at: *${ messageData.travelDate }*!` :
            '';
    }

    getMessageForPassengerTravelToday(notification: Notification): string {
        const messageData = this.parseMessageData<SimpleTravelNotificationData>(notification);
        return messageData ? $localize`:@@notification-container-service.ts.passenger-travel-today.message:
                *Reminder* your travel as a *passenger* from *${ messageData.from }* to *${ messageData.to }*
                is today at: *${ messageData.travelDate }*!` :
            '';
    }

    private parseMessageData<Type>(notification: Notification): Type | undefined {
        try {
            return JSON.parse(notification.messageData) as Type;
        } catch (err) {
            console.error(`Failed parsing message data for notification with id ${ notification.id }`);
        }

        return;
    }

    getNotificationTimeMessage(notification: Notification): string {
        const date = notification.createdDate;
        const now = new Date();

        const diff = now.getTime() - date.getTime();

        const diffInMinutes = Math.floor(diff / 1000 / 60);
        if (diffInMinutes < 1) {
            return $localize`:@@notification-container-service.ts.notification.time-message.just-now: Just now`;
        }

        const diffInHours = Math.floor(diff / 1000 / 60 / 60);

        if (diffInHours < 1) {
            return $localize`:@@notification-container-service.ts.notification.time-message.x-minutes-ago: ${ diffInMinutes } minutes ago`;
        }

        const diffInDays = Math.floor(diff / 1000 / 60 / 60 / 24);

        if (diffInDays < 1) {
            return $localize`:@@notification-container-service.ts.notification.time-message.x-hours-ago: ${ diffInHours } hours ago`;
        }

        const diffInYears = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);

        if (diffInYears < 1) {
            return $localize`:@@notification-container-service.ts.notification.time-message.x-days-ago: ${ diffInDays } days ago`;
        }


        return $localize`:@@notification-container-service.ts.notification.time-message.x-years-ago: ${ diffInYears } years ago`;
    }
}
