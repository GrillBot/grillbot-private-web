import { map } from 'rxjs/operators';
import { ObservableDict, ObservableList } from './../../../core/models/common';
import { StatisticsService } from './../../../core/services/statistics.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticItem } from 'src/app/core/models/statistics';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit, OnDestroy {
    type: string;

    statItemsQuery: ObservableList<StatisticItem>;
    dictQuery: ObservableDict<string, number>;
    listQuery: ObservableList<string>;

    constructor(
        private statisticsService: StatisticsService,
        private systemService: SystemService
    ) { }

    get isDb(): boolean { return this.type === 'db'; }
    get isDbCache(): boolean { return this.type === 'db/cache'; }
    get isAuditLogByType(): boolean { return this.type === 'audit-log/type'; }
    get isAuditLogByDate(): boolean { return this.type === 'audit-log/date'; }
    get isUnverifyLogByType(): boolean { return this.type === 'unverify-logs/type'; }
    get isUnverifyLogByDate(): boolean { return this.type === 'unverify-logs/date'; }
    get isTextCommands(): boolean { return this.type === 'text-commands'; }
    get isInteractions(): boolean { return this.type === 'interactions'; }
    get isJobs(): boolean { return this.type === 'jobs'; }
    get isApiRequestsByDate(): boolean { return this.type === 'api/date'; }
    get isApiRequestsByEndpoint(): boolean { return this.type === 'api/endpoint'; }
    get isApiRequestsByStatusCode(): boolean { return this.type === 'api/status'; }
    get isEventLog(): boolean { return this.type === 'eventLog'; }
    get isEventStats(): boolean { return this.type === 'eventStats'; }

    get isStatLike(): boolean {
        return this.isTextCommands || this.isInteractions || this.isJobs || this.isApiRequestsByEndpoint;
    }

    get canLineChart(): boolean {
        return this.isAuditLogByDate || this.isUnverifyLogByDate || this.isApiRequestsByDate;
    }

    get canBarChart(): boolean {
        return this.isDb || this.isDbCache || this.isAuditLogByType || this.isUnverifyLogByType || this.isApiRequestsByStatusCode
            || this.isEventStats;
    }

    get isList(): boolean {
        return this.isEventLog;
    }

    get header(): string {
        if (this.isDb) { return 'Statistika databáze'; }
        if (this.isDbCache) { return 'Statistika DB cache'; }
        if (this.isAuditLogByType) { return 'Statistika audit logu (podle typu)'; }
        if (this.isAuditLogByDate) { return 'Statistika audit logu (po měsících)'; }
        if (this.isUnverifyLogByType) { return 'Statistika unverify logu (podle typu)'; }
        if (this.isUnverifyLogByDate) { return 'Statistika unverify logu (po měsících)'; }
        if (this.isTextCommands) { return 'Statistika textových příkazů'; }
        if (this.isInteractions) { return 'Statistika interaktivních příkazů'; }
        if (this.isJobs) { return 'Statistika naplánovaných úloh'; }
        if (this.isApiRequestsByDate) { return 'Statistika API požadavků (po měsících)'; }
        if (this.isApiRequestsByEndpoint) { return 'Statistika API požadavků (po metodách)'; }
        if (this.isApiRequestsByStatusCode) { return 'Statistika API požadavků (podle výsledku)'; }
        if (this.isEventLog) { return 'Log událostí'; }
        if (this.isEventStats) { return 'Statistika událostí'; }

        return '';
    }

    ngOnInit(): void {
        if (this.isDb) { this.dictQuery = this.statisticsService.getDbStatus(); }
        if (this.isDbCache) { this.dictQuery = this.statisticsService.getDbCacheStatus(); }
        if (this.isAuditLogByType) { this.dictQuery = this.statisticsService.getAuditLogsStatisticsByType(); }
        if (this.isAuditLogByDate) { this.dictQuery = this.statisticsService.getAuditLogsStatisticsByDate(); }
        if (this.isUnverifyLogByType) { this.dictQuery = this.statisticsService.getUnverifyLogsStatisticsByOperation(); }
        if (this.isUnverifyLogByDate) { this.dictQuery = this.statisticsService.getUnverifyLogsStatisticsByDate(); }
        if (this.isTextCommands) { this.statItemsQuery = this.statisticsService.getCommandsStatistics(); }
        if (this.isInteractions) { this.statItemsQuery = this.statisticsService.getInteractionsStatus(); }
        if (this.isJobs) { this.statItemsQuery = this.statisticsService.getJobsStatistics(); }
        if (this.isApiRequestsByDate) { this.dictQuery = this.statisticsService.getApiRequestsByDate(); }
        if (this.isApiRequestsByEndpoint) { this.statItemsQuery = this.statisticsService.getApiRequestsByEndpoint(); }
        if (this.isApiRequestsByStatusCode) { this.dictQuery = this.statisticsService.getApiRequestsByStatusCode(); }
        if (this.isEventLog) { this.listQuery = this.systemService.getEventLog(); }
        if (this.isEventStats) { this.dictQuery = this.statisticsService.getEventStatistics(); }

        if (this.dictQuery) {
            this.dictQuery = this.dictQuery.pipe(map(data => data.reverse()));
        }
    }

    ngOnDestroy(): void {
        this.statItemsQuery = null;
        this.dictQuery = null;
        this.listQuery = null;
    }
}
