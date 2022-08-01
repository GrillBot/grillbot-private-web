import { GetPointsSummaryParams, PointsSummary, PointsSummaryBase } from './../models/points';
import { HttpErrorResponse } from '@angular/common/http';
import { ObservableList, ObservablePaginatedData, PaginatedResponse } from './../models/common';
import { map, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from "@angular/core";
import { GetPointTransactionsParams, PointsTransaction } from '../models/points';

@Injectable({ providedIn: 'root' })
export class PointsService {
    constructor(private base: BaseService) { }

    getTransactionList(params: GetPointTransactionsParams): ObservablePaginatedData<PointsTransaction> {
        const url = this.base.createUrl('user/points/transactions', params.queryParams);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<PointsTransaction>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => PointsTransaction.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getSummariesList(params: GetPointsSummaryParams): ObservablePaginatedData<PointsSummary> {
        const url = this.base.createUrl('user/points/summaries', params.queryParams);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<PointsSummary>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => PointsSummary.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getGraphData(params: GetPointsSummaryParams): ObservableList<PointsSummaryBase> {
        const url = this.base.createUrl('user/points/graph', params.queryParams);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PointsSummaryBase[]>(url, { headers }).pipe(
            map(data => data.map((entity: PointsSummaryBase) => PointsSummaryBase.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
