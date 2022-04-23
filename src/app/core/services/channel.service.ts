import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedResponse, EmptyObservable } from './../models/common';
import { QueryParam } from './../models/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {
    ChannelDetail, ChannelListSortTypes, ChannelUserStatItem, GetChannelListParams,
    SendMessageToChannelParams, GuildChannelListItem, UpdateChannelParams
} from '../models/channels';
import { environment } from 'src/environments/environment';
import { PaginatedParams } from '../models/common';

/* eslint-disable @typescript-eslint/indent */
@Injectable({ providedIn: 'root' })
export class ChannelService {
    constructor(
        private base: BaseService
    ) { }

    sendMessageToChannel(guildId: string, channelId: string, params: SendMessageToChannelParams): Observable<unknown> {
        const url = `${environment.apiUrl}/channel/${guildId}/${channelId}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getChannelsList(filter: GetChannelListParams): Observable<PaginatedResponse<GuildChannelListItem>> {
        const parameters = filter.queryParams.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/channel?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<GuildChannelListItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildChannelListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeMessagesFromCache(guildId: string, channelId: string): Observable<unknown> {
        const url = `${environment.apiUrl}/channel/${guildId}/${channelId}/cache`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getChannelDetail(id: string): Observable<ChannelDetail> {
        const url = `${environment.apiUrl}/channel/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ChannelDetail>(url, { headers }).pipe(
            map(data => ChannelDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateChannel(id: string, params: UpdateChannelParams): EmptyObservable {
        const url = `${environment.apiUrl}/channel/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserStatsOfChannel(id: string, pagination: PaginatedParams): Observable<PaginatedResponse<ChannelUserStatItem>> {
        const parameters = pagination.queryParams.filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/channel/${id}/userStats?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<ChannelUserStatItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => ChannelUserStatItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
