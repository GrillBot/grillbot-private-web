import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../models/common';
import { GetSearchingListParams, SearchingListItem, SearchingListSortTypes } from '../models/searching';
import { BaseService } from './base.service';
import { QueryParam } from '../models/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

/* eslint-disable @typescript-eslint/type-annotation-spacing */
@Injectable({ providedIn: 'root' })
export class SearchingService {
    constructor(
        private base: BaseService
    ) { }

    getSearchList(filter: GetSearchingListParams)
        : Observable<PaginatedResponse<SearchingListItem>> {
        const parameters = filter.queryParams.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/search?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<SearchingListItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => SearchingListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeSearches(ids: number[]): Observable<unknown> {
        const parameters = ids.map(o => new QueryParam('id', o)).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/search?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
