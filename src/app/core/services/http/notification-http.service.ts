import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CANCEL_URL, NOTIFICATIONS_BASE_URL, NOTIFICATIONS_COUNT_URL, NOTIFICATIONS_JOIN_REQUEST_URL, PENDING_NOTIFICATIONS_JOIN_REQUEST_TRAVELS_URL } from '../../constants';
import { Page } from '../../models/page.model';
import { Pageable } from '../../models/pageable.model';
import { Notification } from '../../components/notification-container/models/notification.model';
import { JoinRequestNotification } from '../../components/notification-container/models/join-request-notification.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotificationHttpService {
    constructor(private http: HttpClient) { }

    getNotifications(pageable: Pageable = { page: 0, size: 20, sort: '' }): Observable<Page<Notification>> {
        const params = new HttpParams()
            .append("page", pageable.page)
            .append("size", pageable.size)
            .append("sort", pageable.sort);

        return this.http.get<Page<Notification>>(NOTIFICATIONS_BASE_URL, { params }).pipe(
            map((notificationsPage: Page<Notification>) => {
                const notifications = notificationsPage.content;
                notifications.map(notification => {
                    notification.createdDate = new Date(notification.createdDate);
                    return notification;
                });
                notificationsPage.content = notifications;
                return notificationsPage;
            })
        );
    }

    getNotificationCount(): Observable<number> {
        return this.http.get<number>(NOTIFICATIONS_COUNT_URL);
    }

    getJoinRequestNotification(id: number): Observable<JoinRequestNotification> {
        return this.http.get<JoinRequestNotification>(`${ NOTIFICATIONS_JOIN_REQUEST_URL }/${ id }`);
    }

    acceptJoinRequestNotification(id: number): Observable<void> {
        return this.http.post<void>(`${ NOTIFICATIONS_JOIN_REQUEST_URL }/${ id }/accept`, {});
    }

    rejectJoinRequestNotification(id: number): Observable<void> {
        return this.http.post<void>(`${ NOTIFICATIONS_JOIN_REQUEST_URL }/${ id }/reject`, {});
    }

    getPendingJoinRequestsForTravel(travelId: number): Observable<Array<JoinRequestNotification>> {
        return this.http.get<Array<JoinRequestNotification>>(`${ PENDING_NOTIFICATIONS_JOIN_REQUEST_TRAVELS_URL }/${ travelId }`);
    }

    cancelJoinRequest(travelId: number): Observable<void> {
        return this.http.post<void>(`${ PENDING_NOTIFICATIONS_JOIN_REQUEST_TRAVELS_URL }/${ travelId }${ CANCEL_URL }`, {});
    }
}
