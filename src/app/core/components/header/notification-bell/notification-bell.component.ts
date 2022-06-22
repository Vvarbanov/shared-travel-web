import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationBellService } from './services/notification-bell.service';
import { Subscription } from 'rxjs';
import { Notification } from '../../notification-container/models/notification.model';
import { PaginationService } from 'src/app/core/services/pagination/pagination.service';
import { SortDirection } from 'src/app/core/models/sort-direction';

@Component({
    selector: 'app-notification-bell',
    templateUrl: './notification-bell.component.html',
    styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    notificationCount: number | null;

    constructor(private notificationBellService: NotificationBellService) {
        this.notificationCount = null;
        this.notificationBellService.startNotificationCountInterval();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.notificationBellService.notificationCountObs.subscribe(res => {
                this.notificationCount = res === 0 ? null : res;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    notificationBellClick(): void {
        this.notificationCount = null;
    }
}
