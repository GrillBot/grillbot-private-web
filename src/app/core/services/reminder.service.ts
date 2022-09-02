import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../models/common';
import { QueryParam } from '../models/http';
import { GetReminderListParams, RemindMessage } from '../models/reminder';
import { BaseService } from './base.service';

/* eslint-disable @typescript-eslint/type-annotation-spacing */
@Injectable({ providedIn: 'root' })
export class ReminderService {
    constructor(
        private base: BaseService
    ) { }

    getReminderList(params: GetReminderListParams): Observable<PaginatedResponse<RemindMessage>> {
        const url = `${environment.apiUrl}/remind/list`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<RemindMessage>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => RemindMessage.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    cancelRemind(id: number, notify: boolean): Observable<unknown> {
        const parameter = new QueryParam('notify', notify).toString();
        const url = `${environment.apiUrl}/remind/${id}?${parameter}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
