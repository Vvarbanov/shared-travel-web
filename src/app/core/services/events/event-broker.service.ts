import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dictionary } from '../../models/dictionary.model';

@Injectable({
    providedIn: 'root'
})
export class EventBrokerService {
    events: Dictionary<Subject<void>> = {};

    constructor() { }

    registerEvent(event: string): void {
        this.events[event] = new Subject();
    }

    publishEvent(event: string): void {
        this.events[event].next();
    }

    getEvent(event: string): Subject<void> {
        return this.events[event];
    }
}
