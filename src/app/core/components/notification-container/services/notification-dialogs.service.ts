import { Injectable } from '@angular/core';
import { DateService } from '../../../services/date/date.service';
import { JoinRequestNotification } from '../models/join-request-notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationDialogsService {

    constructor(private dateService: DateService) { }

    getJoinRequestDialogMessage(notification: JoinRequestNotification): string {
        return $localize`:@@notification-container-service.ts.join-request-dialog.message:
        The travel departs from *${ notification.travel.from }*,
        heads for *${ notification.travel.to }*,
        scheduled for *${ this.dateService.formatDateLongPretty(notification.travel.departureDate) }*`;
    }
}
