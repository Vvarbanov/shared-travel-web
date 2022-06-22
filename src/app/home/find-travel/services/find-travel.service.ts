import { Injectable } from '@angular/core';
import { Page } from '../../../core/models/page.model';
import { Travel } from '../../travel-list/models/travel.model';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { TravelFilter } from '../models/travel-filter.model';
import { Pageable } from '../../../core/models/pageable.model';
import { PageEvent } from '@angular/material/paginator';
import { RedirectService } from 'src/app/core/services/redirects/redirect.service';
import { TravelHttpService } from '../../../core/services/http/travel-http.service';

@Injectable({
    providedIn: 'root'
})
export class FindTravelService {
    private filter: TravelFilter | undefined;
    private travelPageSubject = new ReplaySubject<Page<Travel>>();

    constructor(
        private redirectService: RedirectService,
        private travelHttpService: TravelHttpService
    ) { }

    get travelPageObs(): Observable<Page<Travel>> {
        return this.travelPageSubject.asObservable();
    }

    findTravels(filter: TravelFilter, pageable: Pageable = { page: 0, size: 20, sort: '' }): Observable<Page<Travel>> {
        this.filter = filter;
        return this.travelHttpService.getTravels(filter, pageable).pipe(map(res => {
            this.travelPageSubject.next(res);
            return res;
        }));
    }

    findTravelsPage(pageEvent: PageEvent): void {
        if (!this.checkIfFilterAvailable()) return;

        this.findTravels(this.filter!, { page: pageEvent.pageIndex, size: pageEvent.pageSize, sort: '' })
            .subscribe({ error: e => console.error(e) });
    }

    checkIfFilterAvailable(): TravelFilter | undefined {
        if (!this.filter) {
            console.error('Could not find filter for travel search.');
            this.redirectService.navigateHome();
            return;
        }

        return this.filter;
    }
}
