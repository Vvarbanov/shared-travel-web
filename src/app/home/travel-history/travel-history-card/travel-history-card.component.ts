import { Component, Input } from '@angular/core';

import { DateService } from '../../../core/services/date/date.service';
import { Travel } from '../../travel-list/models/travel.model';

@Component({
    selector: 'app-travel-history-card',
    templateUrl: './travel-history-card.component.html',
    styleUrls: ['./travel-history-card.component.scss']
})
export class TravelHistoryCardComponent {
    @Input() travel: Travel | undefined;

    constructor(private dateService: DateService) { }

    formatDate(date: Date): string | null {
        return this.dateService.formatDateLongPretty(date);
    }
}
