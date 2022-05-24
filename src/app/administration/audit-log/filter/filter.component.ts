/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExtendedFiltersModalData } from './extended-filters/filters-modal-result';
import { Dictionary } from 'src/app/core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditLogListParams } from 'src/app/core/models/audit-log';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuditLogItemType, AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Support } from 'src/app/core/lib/support';
import { debounceTime } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal';
import { ExtendedFiltersModalComponent } from './extended-filters/extended-filters-modal/extended-filters-modal.component';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<AuditLogListParams>();

    form: FormGroup;
    types: Dictionary<number, string>;
    extendedFilters: ExtendedFiltersModalData;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private modal: ModalService
    ) { }

    get guildId(): string { return this.form.get('guild').value as string; }
    get selectedTypes(): AuditLogItemType[] { return this.form.get('types').value as AuditLogItemType[]; }
    get excludedTypes(): AuditLogItemType[] { return this.form.get('excludedTypes').value as AuditLogItemType[]; }

    get allowExtendedFilters(): boolean {
        const typesWithFilters = [
            AuditLogItemType.Info,
            AuditLogItemType.Warning,
            AuditLogItemType.Error,
            AuditLogItemType.Command,
            AuditLogItemType.InteractionCommand,
            AuditLogItemType.JobCompleted,
            AuditLogItemType.API
        ];

        const selected = [...this.selectedTypes].filter(o => !this.excludedTypes.includes(o));
        return typesWithFilters.some(o => selected.includes(o));
    }

    ngOnInit(): void {
        this.types = Object.keys(AuditLogItemType)
            .filter(o => !isNaN(parseInt(o, 10)) && parseInt(o, 10) > 0)
            .map(o => ({
                key: parseInt(o, 10),
                value: AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, parseInt(o, 10))] as string
            }));

        const filter = AuditLogListParams.create(this.storage.read<any>('AuditLogListParams')) || AuditLogListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        if (this.form.invalid) {
            return;
        }

        const filter = AuditLogListParams.create(this.form.value);

        if (this.extendedFilters) {
            filter.infoFilter = this.extendedFilters.infoFilter;
            filter.warningFilter = this.extendedFilters.warningFilter;
            filter.errorFilter = this.extendedFilters.errorFilter;

            filter.commandFilter = this.extendedFilters.commandFilter;
            filter.interactionsFilter = this.extendedFilters.interactionFilter;
            filter.jobFilter = this.extendedFilters.jobFilter;
            filter.apiRequestFilter = this.extendedFilters.apiRequestFilter;
        }

        this.filterChanged.emit(filter);
        this.storage.store<AuditLogListParams>('AuditLogListParams', filter.serialized);
    }

    cleanFilter(): void {
        this.extendedFilters = null;
        this.form.patchValue(AuditLogListParams.empty.serialized);
    }

    openExtendedFiltersModal(): void {
        const modal = this.modal.showCustomModal<ExtendedFiltersModalComponent>(ExtendedFiltersModalComponent, 'xl');
        modal.componentInstance.selectedTypes = this.selectedTypes;
        modal.componentInstance.result = this.extendedFilters;

        modal.onAccept.subscribe(_ => {
            this.extendedFilters = modal.componentInstance.result;
            this.submitForm();
        });
    }

    private initFilter(filterData: AuditLogListParams): void {
        const serialized = filterData.serialized;

        this.form = this.fb.group({
            guild: [serialized.guild],
            channel: [serialized.channel],
            createdFrom: [serialized.createdFrom],
            createdTo: [serialized.createdTo],
            ignoreBots: [serialized.ignoreBots],
            processedUsers: [serialized.processedUsers],
            types: [serialized.types],
            ids: [serialized.ids, Validators.pattern('^[0-9,]*$')],
            excludedTypes: [serialized.excludedTypes]
        });

        this.extendedFilters = {
            commandFilter: filterData.commandFilter,
            errorFilter: filterData.errorFilter,
            infoFilter: filterData.infoFilter,
            interactionFilter: filterData.interactionsFilter,
            jobFilter: filterData.jobFilter,
            warningFilter: filterData.warningFilter,
            apiRequestFilter: filterData.apiRequestFilter
        };

        this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.submitForm());
    }
}
