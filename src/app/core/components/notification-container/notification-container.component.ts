import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { Notification } from './models/notification.model';
import { NotificationTypeEnum } from './models/notification-type.enum';
import { NotificationContainerService } from './services/notification-container.service';
import { Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'app-notification-container',
    templateUrl: './notification-container.component.html',
    styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit, OnDestroy, AfterViewInit {

    TYPE_JOIN = NotificationTypeEnum[NotificationTypeEnum.JOIN];

    private subscriptions = new Subscription();

    notifications: Notification[] = [];

    @ViewChild('scroller')
    scroller!: CdkVirtualScrollViewport;

    constructor(
        private ngZone: NgZone,
        private notificationContainerService: NotificationContainerService
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(
            this.notificationContainerService.notificationPageObs.subscribe(res => {
                this.notifications = [...this.notifications, ...res.content];
            })
        );
    }

    ngAfterViewInit(): void {
        this.notificationContainerService.getNotifications();

        // Scroll pipe and subscription on virtual scroll element
        // Check if there are less than 145px to scroll to the bottom
        this.subscriptions.add(
            this.scroller.elementScrolled().pipe(
                map(() => this.scroller.measureScrollOffset('bottom')),
                pairwise(),
                filter(([y1, y2]) => y2 < y1 && y2 < 145),
                throttleTime(200)
            ).subscribe(() => {
                this.ngZone.run(() => {
                    this.notificationContainerService.getNextNotificationsPage();
                });
            })
        );

        // Observe the virtual scroller element for resize
        // Angular Material mat menu creates components inside it but hides it at 0 height and width
        // Due to this onInit and afterInit are not useful for scrolling operations
        // The virtual scroll needs to update, since the menu opens at scroll 0 but does not update the virtual scroll
        this.resizeObserver.observe(this.scroller.elementRef.nativeElement);
    }

    // Resize Observer that captures when the element has changed height from 0
    // Used to re-render the virtual scroller and update the view with visible notification (Angular material is fun)
    private resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            if (entry.contentRect.height != 0) {
                // Force view port size check
                // This way we update the virtual scroll to render the topmost items
                this.scroller.checkViewportSize();
            }
        }
    });

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.resizeObserver.disconnect();
        this.notificationContainerService.clearNotifications();
    }

    getNotificationMessage(notification: Notification): string {
        return this.notificationContainerService.getMessageForNotification(notification);
    }

    getNotificationTimeMessage(notification: Notification): string {
        return this.notificationContainerService.getNotificationTimeMessage(notification);;
    }

    handleCallback(notification: Notification): void {
        this.notificationContainerService.handleNotificationClick(notification);
    }
}
