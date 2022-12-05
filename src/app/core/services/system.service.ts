import { ObservableList } from './../models/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Dashboard } from '../models/system';
import { HttpErrorResponse } from '@angular/common/http';
import { QueryParam } from '../models/http';

@Injectable({ providedIn: 'root' })
export class SystemService {
    constructor(
        private base: BaseService
    ) { }

    setBotState(isActive: boolean): Observable<unknown> {
        const url = this.base.createUrl('system/status', [new QueryParam('isActive', isActive)]);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getEventLog(): ObservableList<string> {
        const url = this.base.createUrl('system/eventLog');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<string[]>(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        )
    }

    getDashboard(): Observable<Dashboard> {
        const url = this.base.createUrl('system/dashboard');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dashboard>(url, { headers }).pipe(
            map((o: any) => Dashboard.create(o)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
