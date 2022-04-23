import { HttpErrorResponse } from '@angular/common/http';
import { UnverifyLogParams, UnverifyListSortTypes, UnverifyLogItem } from './../models/unverify';
import { catchError, map } from 'rxjs/operators';
import { EmptyObservable, ObservableList, PaginatedParams, PaginatedResponse } from './../models/common';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnverifyUserProfile } from '../models/unverify';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/http';

/* eslint-disable @typescript-eslint/indent */
@Injectable({ providedIn: 'root' })
export class UnverifyService {
    constructor(
        private base: BaseService
    ) { }

    getCurrentUnverifies(): ObservableList<UnverifyUserProfile> {
        const url = `${environment.apiUrl}/unverify/current`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UnverifyUserProfile[]>(url, { headers }).pipe(
            map(data => data.map(o => UnverifyUserProfile.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeUnverify(guildId: string, userId: string): EmptyObservable {
        const url = `${environment.apiUrl}/unverify/${guildId}/${userId}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateUnverifyTime(guildId: string, userId: string, newEnd: string): Observable<string> {
        const parameter = new QueryParam('endTime', newEnd).toString();
        const url = `${environment.apiUrl}/unverify/${guildId}/${userId}?${parameter}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put<{ message: string }>(url, null, { headers }).pipe(
            map(data => data.message),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUnverifyLog(filter: UnverifyLogParams): Observable<PaginatedResponse<UnverifyLogItem>> {
        const parameters = filter.queryParams.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/unverify/log?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<UnverifyLogItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => UnverifyLogItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    recoverUnverifyState(logId: number): EmptyObservable {
        const url = `${environment.apiUrl}/unverify/log/${logId}/recover`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
