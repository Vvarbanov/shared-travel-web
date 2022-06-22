import { Component, OnInit } from '@angular/core';
import { Events } from './core/models/events.model';
import { EventBrokerService } from './core/services/events/event-broker.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = `shared-travel`;

    constructor(private eventService: EventBrokerService) { }

    ngOnInit(): void {
        this.registerAppEvents();
    }

    private registerAppEvents() {
        this.eventService.registerEvent(Events.loginSuccessful);
        this.eventService.registerEvent(Events.profileDataUpdated);
        this.eventService.registerEvent(Events.logoutSuccessful);
    }
}
