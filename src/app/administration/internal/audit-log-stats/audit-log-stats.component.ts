import { Dictionary } from 'src/app/core/models/common';
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
    selector: 'app-audit-log-stats',
    templateUrl: './audit-log-stats.component.html'
})
export class AuditLogStatsComponent implements OnInit {
    data: Dictionary<string, number>;

    constructor(
        private systemService: SystemService
    ) { }

    ngOnInit(): void {
        this.systemService.getAuditLogStatistics().subscribe(data => this.data = data);
    }

}
