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
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/db`);
    }

    getDbCacheStatus(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/db/cache`);
    }

    getAuditLogsStatisticsByType(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/audit-log/type`)
    }

    getAuditLogsStatisticsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/audit-log/date`);
    }

    getCommandsStatistics(): ObservableList<StatisticItem> {
        return this.getObjectStatistics(`${environment.apiUrl}/stats/commands`);
    }

    getInteractionsStatus(): ObservableList<StatisticItem> {
        return this.getObjectStatistics(`${environment.apiUrl}/stats/interactions`);
    }

    getUnverifyLogsStatisticsByOperation(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/unverify-logs/type`);
    }

    getUnverifyLogsStatisticsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/unverify-logs/date`);
    }

    getJobsStatistics(): ObservableList<StatisticItem> {
        return this.getObjectStatistics(`${environment.apiUrl}/stats/jobs`);
    }

    getApiRequestsByEndpoint(): ObservableList<StatisticItem> {
        return this.getObjectStatistics(`${environment.apiUrl}/stats/api/endpoint`);
    }

    getApiRequestsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/api/date`);
    }

    getApiRequestsByStatusCode(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/api/status`);
    }

    getApiRequestsByHttpMethod(): ObservableDict<string, number> {
        return this.getDictionaryStatistics(`${environment.apiUrl}/stats/api/method`);
    }

    private getDictionaryStatistics(url: string): ObservableDict<string, number> {
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    private getObjectStatistics(url: string): ObservableList<StatisticItem> {
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
