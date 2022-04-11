import { QueryParam } from './../models/http';
import { Dictionary, ObservableDict, ObservableList } from './../models/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EmoteItem } from '../models/emotes';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
        private base: BaseService
    ) { }

    getGuilds(): ObservableDict<string, string> {
        const url = `${environment.apiUrl}/data/guilds`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getChannels(guildId?: string, ignoreThreads: boolean = false): ObservableDict<string, string> {
        const parameters: QueryParam[] = [];
        if (guildId) { parameters.push(new QueryParam('guildId', guildId)); }
        if (ignoreThreads) { parameters.push(new QueryParam('ignoreThreads', ignoreThreads)); }
        const params = parameters.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/data/channels?${params}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getRoles(guildId?: string): ObservableDict<string, string> {
        const parameter = [guildId ? new QueryParam('guildId', guildId) : null].filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/data/roles?${parameter}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getCommands(): ObservableList<string> {
        const url = `${environment.apiUrl}/data/commands`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<string[]>(url, { headers }).pipe(
            map(data => data.map(o => o)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUsersList(bots?: boolean): ObservableDict<string, string> {
        const parameter = bots === undefined ? '' : new QueryParam('bots', bots).toString();
        const url = `${environment.apiUrl}/data/users?${parameter}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getEmotes(): ObservableList<EmoteItem> {
        const url = `${environment.apiUrl}/data/emotes`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<EmoteItem[]>(url, { headers }).pipe(
            map(emotes => emotes.map(e => EmoteItem.create(e))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
