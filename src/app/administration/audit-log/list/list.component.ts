/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild } from '@angular/core';
import { Support } from 'src/app/core/lib/support';
import { AuditLogFileMetadata, AuditLogListItem, AuditLogListParams, SortingTypes } from 'src/app/core/models/audit-log';
import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { AuditLogItemType } from 'src/app/core/models/enums/audit-log-item-type';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { orderBy: 'CreatedAt', descending: true };
    private filter: AuditLogListParams;

    constructor(
        private auditLogService: AuditLogService,
        private modalService: ModalService
    ) { }

    get AuditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }
    get Support(): typeof Support { return Support; }

    filterChanged(filter: AuditLogListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.auditLogService.getAuditLogList(this.filter)
            .subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: SortingTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }
        if (this.list) { this.list.filterChanged(); }
    }

    removeItem(id: number): void {
        this.modalService.showQuestion('Smazání záznamu z logu', 'Opravdu si přeješ smazat záznam z logu? Tato akce je nevratná!')
            .onAccept.subscribe(_ => this.auditLogService.removeItem(id).subscribe(__ => this.list.filterChanged()));
    }

    openDetail(item: AuditLogListItem, raw: boolean): void {
        const modal = this.modalService.showCustomModal<DetailModalComponent>(DetailModalComponent, 'xl');
        modal.componentInstance.item = item;
        modal.componentInstance.rawView = raw;
    }

    downloadFile(id: number, file: AuditLogFileMetadata): void {
        this.auditLogService.downloadFile(id, file);
    }
}
