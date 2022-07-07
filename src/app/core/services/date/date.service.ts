import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor(private datePipe: DatePipe) { }

    getDateFromNoTimezoneString(date: string): Date {
        const temp = new Date(date);
        return new Date(temp.getTime() - temp.getTimezoneOffset() * 60000);
    }

    formatDateLongPretty(date: Date): string | null {
        const dateFormat = $localize`:@@date-service.ts.date-format-long-simple:MMM dd \'at\' HH:mm`;
        return this.transform(date, dateFormat);
    }

    formatDateLongYearPretty(date: Date): string | null {
        const dateFormat = $localize`:@@date-service.ts.date-format-long-year:MMM dd YY \'at\' HH:mm`;
        return this.transform(date, dateFormat);
    }

    private transform(date: Date | string, format: string) {
        date = this.getDateFromNoTimezoneString(date.toString());
        return this.datePipe.transform(date, format);
    }
}
