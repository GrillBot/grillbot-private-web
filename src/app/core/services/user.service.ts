import { EmptyObservable } from './../models/common';
import { UpdateUserParams } from './../models/users';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/common';
import { GetUserListParams, UserDetail, UserListItem } from '../models/users';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private base: BaseService
    ) { }

    getUsersList(filter: GetUserListParams): Observable<PaginatedResponse<UserListItem>> {
        const url = `${environment.apiUrl}/users/list`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<UserListItem>>(url, filter, { headers }).pipe(
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

    updateUser(id: string, params: UpdateUserParams): EmptyObservable {
        const url = `${environment.apiUrl}/users/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put<unknown>(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
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
