import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Dictionary } from '../../models/dictionary.model';

@Injectable({
    providedIn: 'root'
})
export class EventBrokerService {
    events: Dictionary<ReplaySubject<void>> = {};

    constructor() { }

    registerEvent(event: string): void {
        this.events[event] = new ReplaySubject();
    }

    publishEvent(event: string): void {
        this.events[event].next();
    }

    getEvent(event: string): ReplaySubject<void> {
        return this.events[event];
    }
}
