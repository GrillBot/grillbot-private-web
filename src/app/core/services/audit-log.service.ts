import { HttpErrorResponse } from '@angular/common/http';
import { EmptyObservable, PaginatedResponse } from './../models/common';
import { AuditLogFileMetadata, AuditLogListItem, ClientLogItemRequest, SortingTypes } from './../models/audit-log';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuditLogListParams } from '../models/audit-log';
import { PaginatedParams } from '../models/common';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/http';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
    constructor(
        private base: BaseService
    ) { }

    removeItem(id: number): Observable<unknown> {
        const url = `${environment.apiUrl}/auditlog/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogList(filter: AuditLogListParams): Observable<PaginatedResponse<AuditLogListItem>> {
        const parameters = filter.queryParams.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/auditlog?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<AuditLogListItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => AuditLogListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    downloadFile(id: number, file: AuditLogFileMetadata): void {
        const url = `${environment.apiUrl}/auditlog/${id}/${file.id}`;
        const headers = this.base.getHttpHeaders();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (headers as any).responseType = 'blob';

        this.base.http.get(url, { headers, responseType: 'blob', observe: 'response' }).subscribe(resource => {
            const body = resource.body;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            saveAs(body, file.filename);
        });
    }
}
