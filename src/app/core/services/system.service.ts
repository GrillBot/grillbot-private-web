import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DiagnosticsInfo } from '../models/system';
import { environment } from 'src/environments/environment';
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

    setBotState(isActive: boolean): Observable<unknown> {
        const parameters = new QueryParam('isActive', isActive).toString();
        const url = `${environment.apiUrl}/system/status?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
