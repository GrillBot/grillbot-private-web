import { ObservableDict, ObservableList } from './../../../core/models/common';
import { StatisticsService } from './../../../core/services/statistics.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticItem } from 'src/app/core/models/statistics';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
    type: string;

    statItemsQuery: ObservableList<StatisticItem>;
    dictQuery: ObservableDict<string, number>;

    constructor(private statisticsService: StatisticsService) { }

    get isDb(): boolean { return this.type === 'db'; }
    get isAuditLogByType(): boolean { return this.type === 'audit-log/type'; }
    get isAuditLogByDate(): boolean { return this.type === 'audit-log/date'; }
    get isUnverifyLogByType(): boolean { return this.type === 'unverify-logs/type'; }
    get isUnverifyLogByDate(): boolean { return this.type === 'unverify-logs/date'; }
    get isTextCommands(): boolean { return this.type === 'text-commands'; }
    get isInteractions(): boolean { return this.type === 'interactions'; }
    get isJobs(): boolean { return this.type === 'jobs'; }

    get isDictLike(): boolean {
        return this.isDb || this.isAuditLogByType || this.isAuditLogByDate || this.isUnverifyLogByType || this.isUnverifyLogByDate;
    }

    get isStatLike(): boolean {
        return this.isTextCommands || this.isInteractions || this.isJobs;
    }

    get header(): string {
        if (this.isDb) { return 'Statistika databáze'; }
        else if (this.isAuditLogByType) { return 'Statistika audit logu (podle typu)'; }
        else if (this.isAuditLogByDate) { return 'Statistika audit logu (po měsících)'; }
        else if (this.isUnverifyLogByType) { return 'Statistika unverify logu (podle typu)'; }
        else if (this.isUnverifyLogByDate) { return 'Statistika unverify logu (po měsících)'; }
        else if (this.isTextCommands) { return 'Statistika textových příkazů'; }
        else if (this.isInteractions) { return 'Statistika interaktivních příkazů'; }
        else if (this.isJobs) { return 'Statistika naplánovaných úloh'; }

        return '';
    }

    ngOnInit(): void {
        if (this.isDb) { this.dictQuery = this.statisticsService.getDbStatus(); }
        else if (this.isAuditLogByType) { this.dictQuery = this.statisticsService.getAuditLogsStatisticsByType(); }
        else if (this.isAuditLogByDate) { this.dictQuery = this.statisticsService.getAuditLogsStatisticsByDate(); }
        else if (this.isUnverifyLogByType) { this.dictQuery = this.statisticsService.getUnverifyLogsStatisticsByOperation(); }
        else if (this.isUnverifyLogByDate) { this.dictQuery = this.statisticsService.getUnverifyLogsStatisticsByDate(); }
        else if (this.isTextCommands) { this.statItemsQuery = this.statisticsService.getCommandsStatistics(); }
        else if (this.isInteractions) { this.statItemsQuery = this.statisticsService.getInteractionsStatus(); }
        else if (this.isJobs) { this.statItemsQuery = this.statisticsService.getJobsStatistics(); }
    }

    ngOnDestroy(): void {
        this.statItemsQuery = null;
        this.dictQuery = null;
    }
}