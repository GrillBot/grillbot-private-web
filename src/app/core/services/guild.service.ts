import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Guild, GuildDetail, GuildListFilter, UpdateGuildParams } from '../models/guilds';
import { BaseService } from './base.service';
import { PaginatedResponse } from '../models/common';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuildService {
    constructor(
        private base: BaseService
    ) { }

    getGuildList(filter: GuildListFilter): Observable<PaginatedResponse<Guild>> {
        const parameters = filter.queryParams.map(o => o.toString()).join('&');

        const url = `${environment.apiUrl}/guild?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<Guild>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create<Guild>(data, entity => Guild.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getGuildDetail(id: string): Observable<GuildDetail> {
        const url = `${environment.apiUrl}/guild/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<GuildDetail>(url, { headers }).pipe(
            map(data => GuildDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateGuild(id: string, params: UpdateGuildParams): Observable<GuildDetail> {
        const url = `${environment.apiUrl}/guild/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put<GuildDetail>(url, params, { headers }).pipe(
            map(data => GuildDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
