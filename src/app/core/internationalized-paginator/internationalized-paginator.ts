import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class InternationalizedPaginator implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = $localize`:@@paginator.first-page:First page`;
    lastPageLabel = $localize`:@@paginator.last-page:Last page`;
    itemsPerPageLabel = $localize`:@@paginator.item-per-page:Items per page:`;
    nextPageLabel = $localize`:@@paginator.next-page:Next page`;
    previousPageLabel = $localize`:@@paginator.prev-page:Previous page`;

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return $localize`:@@paginator.range.one:Page 1 of 1`;
        }

        const amountPages = Math.ceil(length / pageSize);
        return $localize`:@@paginator.range.multi:Page ${ page + 1 } of ${ amountPages }`;
    }
}