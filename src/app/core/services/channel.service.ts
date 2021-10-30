import { PaginatedResponse } from './../models/common';
import { QueryParam } from './../models/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {
    ChannelDetail, ChannelListSortTypes, ChannelUserStatItem, GetChannelListParams,
    GuildChannel, SendMessageToChannelParams
} from '../models/channels';
import { environment } from 'src/environments/environment';
import { PaginatedParams } from '../models/common';

@Injectable({ providedIn: 'root' })
export class ChannelService {
    constructor(
        private base: BaseService
    ) { }

    sendMessageToChannel(guildId: string, channelId: string, params: SendMessageToChannelParams): Observable<unknown> {
        const url = `${environment.apiUrl}/channel/${guildId}/${channelId}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, params, { headers }).pipe(
            catchError(err => this.base.catchError(err))
        );
    }

    getChannelsList(filter: GetChannelListParams, pagination: PaginatedParams, sortBy: ChannelListSortTypes, sortDesc: boolean):
        Observable<PaginatedResponse<GuildChannel>> {
        const parameters = [
            ...filter.queryParams,
            ...pagination.queryParams,
            new QueryParam('sortBy', sortBy),
            new QueryParam('sortDesc', sortDesc)
        ].filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/channel?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<GuildChannel>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildChannel.create(entity))),
            catchError(err => this.base.catchError(err))
        );
    }

    removeMessagesFromCache(guildId: string, channelId: string): Observable<unknown> {
        const url = `${environment.apiUrl}/channel/${guildId}/${channelId}/cache`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError(err => this.base.catchError(err))
        );
    }

    getChannelDetail(id: string): Observable<ChannelDetail> {
        const url = `${environment.apiUrl}/channel/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ChannelDetail>(url, { headers }).pipe(
            map(data => ChannelDetail.create(data)),
            catchError(err => this.base.catchError(err))
        );
    }

    getUserStatsOfChannel(id: string, pagination: PaginatedParams): Observable<PaginatedResponse<ChannelUserStatItem>> {
        const url = `${environment.apiUrl}/channel/${id}/userStats?${pagination.queryParams.filter(o => o).map(o => o.toString()).join('&')}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<ChannelUserStatItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => ChannelUserStatItem.create(entity))),
            catchError(err => this.base.catchError(err))
        );
    }
}
