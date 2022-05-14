import { ExecutionFilterComponent } from './../execution-filter/execution-filter.component';
import { TextFilterComponent } from './../text-filter/text-filter.component';
import { ExtendedFiltersModalResult } from './../filters-modal-result';
import { AuditLogItemType } from './../../../../../core/models/enums/audit-log-item-type';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-extended-filters-modal',
    templateUrl: './extended-filters-modal.component.html'
})
export class ExtendedFiltersModalComponent implements OnInit {
    @Input() selectedTypes: AuditLogItemType[];

    @ViewChild('info', { static: false }) info: TextFilterComponent;
    @ViewChild('info', { static: false }) warning: TextFilterComponent;
    @ViewChild('info', { static: false }) error: TextFilterComponent;

    @ViewChild('command', { static: false }) command: ExecutionFilterComponent;
    @ViewChild('interaction', { static: false }) interaction: ExecutionFilterComponent;
    @ViewChild('job', { static: false }) job: ExecutionFilterComponent;

    constructor() { }

    get result(): ExtendedFiltersModalResult {
        return {
            infoFilter: this.info?.result,
            commandFilter: this.command?.result,
            errorFilter: this.error?.result,
            interactionFilter: this.interaction?.result,
            jobFilter: this.job?.result,
            warningFilter: this.warning?.result
        };
    }

    get canInfo(): boolean { return this.selectedTypes.includes(AuditLogItemType.Info); }
    get canWarning(): boolean { return this.selectedTypes.includes(AuditLogItemType.Warning); }
    get canError(): boolean { return this.selectedTypes.includes(AuditLogItemType.Error); }
    get canCommand(): boolean { return this.selectedTypes.includes(AuditLogItemType.Command); }
    get canInteraction(): boolean { return this.selectedTypes.includes(AuditLogItemType.InteractionCommand); }
    get canJob(): boolean { return this.selectedTypes.includes(AuditLogItemType.JobCompleted); }

    ngOnInit(): void {
    }

}
