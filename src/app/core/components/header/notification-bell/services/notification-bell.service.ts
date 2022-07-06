import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { NotificationHttpService } from '../../../../services/http/notification-http.service';
import { EventBrokerService } from '../../../../services/events/event-broker.service';
import { Events } from '../../../../models/events.model';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';
import { AUTH_TOKEN_KEY } from '../../../../constants';

@Injectable({
    providedIn: 'root'
})
export class NotificationBellService {
    private NOTIFICATION_COUNT_INTERVAL_MILI = 10000;

    private notificationCountSubject = new ReplaySubject<number>();
    private interval: NodeJS.Timeout | null | undefined;
    private timeout: NodeJS.Timeout;

    constructor(
        private notificationHttpService: NotificationHttpService,
        private eventBrokerService: EventBrokerService,
        private localStorageService: LocalStorageService,
    ) {
        this.timeout = setTimeout(() => {
            if (this.localStorageService.get(AUTH_TOKEN_KEY)) {
                this.startNotificationCountInterval();
            }
        }, 1000);

        this.eventBrokerService.getEvent(Events.loginSuccessful)?.subscribe(() => this.startNotificationCountInterval());
        this.eventBrokerService.getEvent(Events.logoutSuccessful)?.subscribe(() => this.stopNotificationCountInterval());
    }

    get notificationCountObs(): Observable<number> {
        return this.notificationCountSubject.asObservable();
    }

    private startNotificationCountInterval(): void {
        if (this.interval) return;
        clearTimeout(this.timeout);

        this.getNotificationCount();
        this.interval = setInterval(() => this.getNotificationCount(), this.NOTIFICATION_COUNT_INTERVAL_MILI);
    }

    private stopNotificationCountInterval(): void {
        if (!this.interval) return;

        clearInterval(this.interval);
        this.interval = null;
    }

    private getNotificationCount(): void {
        this.notificationHttpService.getNotificationCount().subscribe({
            next: res => this.notificationCountSubject.next(res),
            error: e => console.error(e)
        });
    }
}
