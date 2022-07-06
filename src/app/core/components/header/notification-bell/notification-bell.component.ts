import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationBellService } from './services/notification-bell.service';

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
