import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { TravelFilter } from 'src/app/home/find-travel/models/travel-filter.model';
import { Travel } from 'src/app/home/travel-list/models/travel.model';
import { LOCAL_DATE_TIME_FORMAT, LOCALE_EN_US, TRAVELS_BASE_URL, TRAVELS_MY_URL, TRAVELS_JOIN_REQUEST_URL, TRAVELS_LEAVE_URL, PASSENGERS_URL, TRAVELS_KICK_URL, CANCEL_URL } from '../../constants';
import { Page } from '../../models/page.model';
import { Pageable } from '../../models/pageable.model';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/profile/models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class TravelHttpService {
    constructor(private http: HttpClient) { }

    getTravels(filter: TravelFilter, pageable: Pageable = { page: 0, size: 20, sort: '' }): Observable<Page<Travel>> {
        const params = new HttpParams()
            .append("page", pageable.page)
            .append("size", pageable.size)
            .append("sort", pageable.sort)
            .append("from", filter.from)
            .append("to", filter.to)
            .append("departureDate", formatDate(filter.departureDate, LOCAL_DATE_TIME_FORMAT, LOCALE_EN_US));

        return this.http.get<Page<Travel>>(TRAVELS_BASE_URL, { params })
            .pipe(map((travelPage: Page<Travel>) => this.mapTravelPageDates(travelPage)));
    }

    getMyTravels(driverOnly: boolean, inFuture: boolean,
        pageable: Pageable = { page: 0, size: 10, sort: '' }): Observable<Page<Travel>> {
        const params = new HttpParams()
            .append("page", pageable.page)
            .append("size", pageable.size)
            .append("sort", pageable.sort ? pageable.sort : `departureDate,${ inFuture ? 'asc' : 'desc' }`)
            .append('driverOnly', driverOnly)
            .append('inFuture', inFuture);

        return this.http.get<Page<Travel>>(`${ TRAVELS_MY_URL }`, { params })
            .pipe(map((travelPage: Page<Travel>) => this.mapTravelPageDates(travelPage)));
    }

    createTravel(travel: TravelFilter): Observable<Travel> {
        return this.http.post<Travel>(TRAVELS_BASE_URL, travel)
            .pipe(map(travel => this.mapTravelDates(travel)));
    }

    requestJoinTravel(id: number): Observable<void> {
        return this.http.post<void>(`${ TRAVELS_BASE_URL }/${ id }${ TRAVELS_JOIN_REQUEST_URL }`, null);
    }

    cancelTravel(id: number): Observable<Travel> {
        return this.http.patch<Travel>(`${ TRAVELS_BASE_URL }/${ id }${ CANCEL_URL }`, null);
    }

    leaveTravel(id: number): Observable<void> {
        return this.http.post<void>(`${ TRAVELS_BASE_URL }/${ id }${ TRAVELS_LEAVE_URL }`, null);
    }

    kickPassenger(id: number, passengerId: number): Observable<void> {
        return this.http.post<void>(`${ TRAVELS_BASE_URL }/${ id }${ PASSENGERS_URL }/${ passengerId }${ TRAVELS_KICK_URL }`, null);
    }

    private mapTravelPageDates(travelPage: Page<Travel>): Page<Travel> {
        const travels: Travel[] = travelPage.content;
        travels.map(travel => {
            return this.mapTravelDates(travel);
        });
        travelPage.content = travels;
        return travelPage;
    }

    private mapTravelDates(travel: Travel): Travel {
        travel.departureDate = new Date(travel.departureDate);
        return travel;
    }
}
