import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { NotificationHttpService } from '../../../../services/http/notification-http.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationBellService {
    private NOTIFICATION_COUNT_INTERVAL_MILI = 10000;

    private notificationCountSubject = new ReplaySubject<number>();

    constructor(private notificationHttpService: NotificationHttpService) { }

    get notificationCountObs(): Observable<number> {
        return this.notificationCountSubject.asObservable();
    }

    startNotificationCountInterval(): void {
        this.getNotificationCount();
        setInterval(() => this.getNotificationCount(), this.NOTIFICATION_COUNT_INTERVAL_MILI);
    }

    private getNotificationCount(): void {
        this.notificationHttpService.getNotificationCount().subscribe({
            next: res => this.notificationCountSubject.next(res),
            error: e => console.error(e)
        });
    }
}
