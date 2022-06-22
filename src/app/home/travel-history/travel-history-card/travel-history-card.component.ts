import { Component, Input, OnInit } from '@angular/core';
import { Travel } from '../../travel-list/models/travel.model';

@Component({
    selector: 'app-travel-history-card',
    templateUrl: './travel-history-card.component.html',
    styleUrls: ['./travel-history-card.component.scss']
})
export class TravelHistoryCardComponent {
    @Input() travel: Travel | undefined;
}
