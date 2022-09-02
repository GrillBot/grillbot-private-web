import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Dictionary, ObservableDict, ObservableList } from "../models/common";
import { StatisticItem } from "../models/statistics";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    constructor(private base: BaseService) { }

    getDbStatus(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/db');
    }

    getDbCacheStatus(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/db/cache');
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
