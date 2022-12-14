import { map } from 'rxjs/operators';
import { ObservableDict, ObservableList } from './../../../core/models/common';
import { StatisticsService } from './../../../core/services/statistics.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvgExecutionTimes, DatabaseStatistics, StatisticItem } from 'src/app/core/models/statistics';
import { SystemService } from 'src/app/core/services/system.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit, OnDestroy {
    type: string;

    statItemsQuery: ObservableList<StatisticItem>;
    dictQuery: ObservableDict<string, number>;
    listQuery: ObservableList<string>;
    databaseQuery: Observable<DatabaseStatistics>;
    avgTimesQuery: Observable<AvgExecutionTimes>;

    constructor(
        private statisticsService: StatisticsService,
        private systemService: SystemService
    ) { }

    get isDb(): boolean { return this.type === 'db'; }
    get isAuditLogByType(): boolean { return this.type === 'audit-log/type'; }
    get isAuditLogByDate(): boolean { return this.type === 'audit-log/date'; }
    get isUnverifyLogByType(): boolean { return this.type === 'unverify-logs/type'; }
    get isUnverifyLogByDate(): boolean { return this.type === 'unverify-logs/date'; }
    get isInteractions(): boolean { return this.type === 'interactions'; }
    get isApiRequestsByDate(): boolean { return this.type === 'api/date'; }
    get isApiRequestsByEndpoint(): boolean { return this.type === 'api/endpoint'; }
    get isApiRequestsByStatusCode(): boolean { return this.type === 'api/status'; }
    get isEventLog(): boolean { return this.type === 'eventLog'; }
    get isEventStats(): boolean { return this.type === 'eventStats'; }
    get isAvgTimes(): boolean { return this.type === 'avg-times'; }

    get isStatLike(): boolean {
        return this.isInteractions || this.isApiRequestsByEndpoint;
    }

    get canLineChart(): boolean {
        return this.isAuditLogByDate || this.isUnverifyLogByDate || this.isApiRequestsByDate;
    }

    get canBarChart(): boolean {
        return this.isAuditLogByType || this.isUnverifyLogByType || this.isApiRequestsByStatusCode || this.isEventStats;
    }

    get header(): string {
        if (this.isDb) { return 'Statistika datov??ho skladu'; }
        if (this.isAuditLogByType) { return 'Statistika audit logu (podle typu)'; }
        if (this.isAuditLogByDate) { return 'Statistika audit logu (po m??s??c??ch)'; }
        if (this.isUnverifyLogByType) { return 'Statistika unverify logu (podle typu)'; }
        if (this.isUnverifyLogByDate) { return 'Statistika unverify logu (po m??s??c??ch)'; }
        if (this.isInteractions) { return 'Statistika interaktivn??ch p????kaz??'; }
        if (this.isApiRequestsByDate) { return 'Statistika API po??adavk?? (po m??s??c??ch)'; }
        if (this.isApiRequestsByEndpoint) { return 'Statistika API po??adavk?? (po metod??ch)'; }
        if (this.isApiRequestsByStatusCode) { return 'Statistika API po??adavk?? (podle v??sledku)'; }
        if (this.isEventLog) { return 'Log ud??lost??'; }
        if (this.isEventStats) { return 'Statistika ud??lost??'; }
        if (this.isAvgTimes) { return 'Pr??m??rn?? ??asy (po dnech)'; }

        return '';
    }

    ngOnInit(): void {
        if (this.isDb) { this.databaseQuery = this.statisticsService.getDbStatus(); }
        if (this.isAuditLogByType) { this.dictQuery = this.statisticsService.getAuditLogsStatisticsByType(); }
        if (this.isAuditLogByDate) { this.dictQuery = this.statisticsService.getAuditLogsStatisticsByDate(); }
        if (this.isUnverifyLogByType) { this.dictQuery = this.statisticsService.getUnverifyLogsStatisticsByOperation(); }
        if (this.isUnverifyLogByDate) { this.dictQuery = this.statisticsService.getUnverifyLogsStatisticsByDate(); }
        if (this.isInteractions) { this.statItemsQuery = this.statisticsService.getInteractionsStatus(); }
        if (this.isApiRequestsByDate) { this.dictQuery = this.statisticsService.getApiRequestsByDate(); }
        if (this.isApiRequestsByEndpoint) { this.statItemsQuery = this.statisticsService.getApiRequestsByEndpoint(); }
        if (this.isApiRequestsByStatusCode) { this.dictQuery = this.statisticsService.getApiRequestsByStatusCode(); }
        if (this.isEventLog) { this.listQuery = this.systemService.getEventLog(); }
        if (this.isEventStats) { this.dictQuery = this.statisticsService.getEventStatistics(); }
        if (this.isAvgTimes) { this.avgTimesQuery = this.statisticsService.getAvgTimes(); }

        if (this.dictQuery) {
            this.dictQuery = this.dictQuery.pipe(map(data => data.reverse()));
        }
    }

    ngOnDestroy(): void {
        this.statItemsQuery = null;
        this.dictQuery = null;
        this.listQuery = null;
        this.databaseQuery = null;
        this.avgTimesQuery = null;
    }
}
