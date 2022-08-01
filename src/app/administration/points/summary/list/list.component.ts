import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetPointsSummaryParams } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetPointsSummaryParams> {
    constructor(
        private service: PointsService,
    ) {
        super();
    }

    configure(): void {
        this.sort.descending = true;
        this.sort.orderBy = 'Day';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.service.getSummariesList(this.filter);
    }
}
