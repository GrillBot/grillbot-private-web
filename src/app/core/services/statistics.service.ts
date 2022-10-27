import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Dictionary, ObservableDict, ObservableList } from "../models/common";
import { AvgExecutionTimes, DatabaseStatistics, StatisticItem } from "../models/statistics";
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    constructor(private base: BaseService) { }

    getDbStatus(): Observable<DatabaseStatistics> {
        const url = this.base.createUrl('stats/db');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<DatabaseStatistics>(url, { headers }).pipe(
            map(data => DatabaseStatistics.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogsStatisticsByType(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/audit-log/type')
    }

    getAuditLogsStatisticsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/audit-log/date');
    }

    getCommandsStatistics(): ObservableList<StatisticItem> {
        return this.getObjectStatistics('stats/commands');
    }

    getInteractionsStatus(): ObservableList<StatisticItem> {
        return this.getObjectStatistics('stats/interactions');
    }

    getUnverifyLogsStatisticsByOperation(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/unverify-logs/type');
    }

    getUnverifyLogsStatisticsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/unverify-logs/date');
    }

    getJobsStatistics(): ObservableList<StatisticItem> {
        return this.getObjectStatistics('stats/jobs');
    }

    getApiRequestsByEndpoint(): ObservableList<StatisticItem> {
        return this.getObjectStatistics('stats/api/endpoint');
    }

    getApiRequestsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/api/date');
    }

    getApiRequestsByStatusCode(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/api/status');
    }

    getApiRequestsByHttpMethod(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/api/method');
    }

    getEventStatistics(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/events');
    }

    getAvgTimes(): Observable<AvgExecutionTimes> {
        const url = this.base.createUrl('stats/avg-times');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<AvgExecutionTimes>(url, { headers }).pipe(
            map(data => AvgExecutionTimes.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    private getDictionaryStatistics(urlPart: string): ObservableDict<string, number> {
        const url = this.base.createUrl(urlPart);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    private getObjectStatistics(urlPart: string): ObservableList<StatisticItem> {
        const url = this.base.createUrl(urlPart);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
