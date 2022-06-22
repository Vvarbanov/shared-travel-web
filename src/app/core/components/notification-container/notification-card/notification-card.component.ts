import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-notification-card',
    templateUrl: './notification-card.component.html',
    styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {

    @Input()
    disabled: boolean = false;

    @Input()
    htmlMessage!: string;

    @Input()
    timeMessage!: string;

    @Output()
    clickEvent = new EventEmitter<void>();

    constructor() { }
}
