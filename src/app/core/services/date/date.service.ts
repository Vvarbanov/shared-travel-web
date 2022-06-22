import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor(private datePipe: DatePipe) { }

    formatDateLongPretty(date: Date): string | null {
        const dateFormat = $localize`:@@date-service.ts.date-format-long-simple:MMM dd \'at\' HH:mm`;
        return this.datePipe.transform(date, dateFormat);
    }
}
