import { ObservableDict, Dictionary, ObservableList } from './../models/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CommandStatisticItem, DiagnosticsInfo } from '../models/system';
import { environment } from 'src/environments/environment';
import { UserStatus } from '../models/enums/user-status';
import { HttpErrorResponse } from '@angular/common/http';
import { QueryParam } from '../models/http';

@Injectable({ providedIn: 'root' })
export class SystemService {
    constructor(
        private base: BaseService
    ) { }

    getDiagnostics(): Observable<DiagnosticsInfo> {
        const url = `${environment.apiUrl}/system/diag`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<DiagnosticsInfo>(url, { headers }).pipe(
            map(data => DiagnosticsInfo.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getDatabaseInfo(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/system/db`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getCommandsStatistics(searchQuery: string): ObservableList<CommandStatisticItem> {
        const parameters = searchQuery ? new QueryParam('searchQuery', searchQuery).toString() : '';
        const url = `${environment.apiUrl}/system/commands?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<CommandStatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => CommandStatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    setBotState(isActive: boolean): Observable<unknown> {
        const parameters = new QueryParam('isActive', isActive).toString();
        const url = `${environment.apiUrl}/system/status?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
