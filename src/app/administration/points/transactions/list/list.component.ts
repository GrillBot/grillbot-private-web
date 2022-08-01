import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetPointTransactionsParams } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetPointTransactionsParams> {
    constructor(
        private service: PointsService,
        modal: ModalService
    ) {
        super(modal);
    }

    configure(): void {
        this.sort.descending = true;
        this.sort.orderBy = 'AssignedAt';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.service.getTransactionList(this.filter);
    }
}
