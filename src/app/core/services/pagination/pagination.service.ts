import { Injectable } from '@angular/core';
import { Pageable } from '../../models/pageable.model';
import { SortDirection } from '../../models/sort-direction';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    constructor() { }

    getPage(sortedField: string, sortDirection: SortDirection = SortDirection.ASC, page: number = 0, size: number = 20): Pageable {
        if (sortedField) {
            return this.buildPage(page, size, this.getSortFormat(sortedField, sortDirection));
        }

        return this.buildPage(page, size, '');
    }

    private buildPage(page: number = 0, size: number = 20, sort: string = ''): Pageable {
        return { page, size, sort };
    }

    private getSortFormat(sortedField: string, sortDirection: SortDirection): string {
        return `${ sortedField },${ sortDirection }`;
    }
}
