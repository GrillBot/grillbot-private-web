import { UpdateUserParams } from './../models/users';
import { PaginatedParams } from 'src/app/core/models/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/common';
import { GetUserListParams, UserDetail, UserListItem } from '../models/users';
import { BaseService } from './base.service';
import { QueryParam } from '../models/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private base: BaseService
    ) { }

    getUsersList(filter: GetUserListParams, pagination: PaginatedParams, sortDesc: boolean): Observable<PaginatedResponse<UserListItem>> {
        const parameters = [
            ...filter.queryParams,
            ...pagination.queryParams,
            new QueryParam('sortDesc', sortDesc)
        ].filter(o => o).map(o => o.toString()).join('&');

        const url = `${environment.apiUrl}/users?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<UserListItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => UserListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserDetail(id: string): Observable<UserDetail> {
        const url = `${environment.apiUrl}/users/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UserDetail>(url, { headers }).pipe(
            map(data => UserDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateUser(id: string, params: UpdateUserParams): Observable<UserDetail> {
        const url = `${environment.apiUrl}/users/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put<UserDetail>(url, params, { headers }).pipe(
            map(data => UserDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    hearthbeat(): Observable<unknown> {
        const url = `${environment.apiUrl}/users/hearthbeat`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err, true))
        );
    }

    hearthbeatOff(): Observable<unknown> {
        const url = `${environment.apiUrl}/users/hearthbeat`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err, true))
        );
    }
}
