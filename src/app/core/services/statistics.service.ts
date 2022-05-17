import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Dictionary, ObservableDict, ObservableList } from "../models/common";
import { StatisticItem } from "../models/statistics";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    constructor(private base: BaseService) { }

    getDbStatus(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/db`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogsStatisticsByType(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/audit-log/type`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogsStatisticsByDate(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/audit-log/date`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getCommandsStatistics(): ObservableList<StatisticItem> {
        const url = `${environment.apiUrl}/stats/commands`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getInteractionsStatus(): ObservableList<StatisticItem> {
        const url = `${environment.apiUrl}/stats/interactions`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUnverifyLogsStatisticsByOperation(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/unverify-logs/type`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUnverifyLogsStatisticsByDate(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/unverify-logs/date`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getJobsStatistics(): ObservableList<StatisticItem> {
        const url = `${environment.apiUrl}/stats/jobs`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getApiRequestsByEndpoint(): ObservableList<StatisticItem> {
        const url = `${environment.apiUrl}/stats/api/endpoint`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getApiRequestsByDate(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/api/date`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getApiRequestsByStatusCode(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/api/status`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getApiRequestsByHttpMethod(): ObservableDict<string, number> {
        const url = `${environment.apiUrl}/stats/api/method`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
