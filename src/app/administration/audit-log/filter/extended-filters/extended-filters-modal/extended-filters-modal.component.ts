/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExtendedFiltersModalData } from './../filters-modal-result';
import { AuditLogItemType } from './../../../../../core/models/enums/audit-log-item-type';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-extended-filters-modal',
    templateUrl: './extended-filters-modal.component.html'
})
export class ExtendedFiltersModalComponent implements OnInit, AfterViewInit {
    @Input() selectedTypes: AuditLogItemType[];

    form: FormGroup;
    private tmpData: ExtendedFiltersModalData;

    constructor(private fb: FormBuilder) { }

    get auditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }

    get result(): ExtendedFiltersModalData {
        const value = this.form.value;

        return {
            infoFilter: value.info,
            commandFilter: value.command,
            errorFilter: value.error,
            interactionFilter: value.interaction,
            jobFilter: value.job,
            warningFilter: value.warning,
            apiRequestFilter: value.apiRequest
        };
    }

    set result(value: ExtendedFiltersModalData) {
        this.tmpData = value;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            info: [],
            warning: [],
            error: [],
            command: [],
            interaction: [],
            job: [],
            apiRequest: []
        });

        this.fill();
    }

    ngAfterViewInit(): void {
        this.fill();
    }

    can(type: AuditLogItemType): boolean {
        return this.selectedTypes.includes(type);
    }

    private fill(): void {
        if (!this.tmpData) {
            return;
        }

        this.form.patchValue({
            info: this.tmpData.infoFilter,
            warning: this.tmpData.warningFilter,
            error: this.tmpData.errorFilter,
            command: this.tmpData.commandFilter,
            interaction: this.tmpData.interactionFilter,
            job: this.tmpData.jobFilter,
            apiRequest: this.tmpData.apiRequestFilter
        });

        this.tmpData = null;
    }
}
