import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedResponse, ObservableDict, Dictionary } from './../models/common';
import { Injectable } from '@angular/core';
import { GetInviteListParams, GuildInvite } from '../models/invites';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InviteService {
    constructor(
        private base: BaseService
    ) { }

    getInviteList(params: GetInviteListParams): Observable<PaginatedResponse<GuildInvite>> {
        const url = `${environment.apiUrl}/invite/list`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<GuildInvite>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildInvite.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    refreshMetadataCache(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/invite/metadata/refresh`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<Dictionary<string, number>>(url, null, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: parseInt(data[k], 10) }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getCurrentMetadataCount(): Observable<number> {
        const url = `${environment.apiUrl}/invite/metadata/count`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<number>(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
