/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild } from '@angular/core';
import { Support } from 'src/app/core/lib/support';
import { AuditLogFileMetadata, AuditLogListItem, AuditLogListParams, SortingTypes } from 'src/app/core/models/audit-log';
import { PaginatedParams } from 'src/app/core/models/common';
import { AuditLogItemType } from 'src/app/core/models/enums/audit-log-item-type';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { CardComponent } from 'src/app/shared/card/card.component';
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
    @ViewChild('card', { static: false }) card: CardComponent;

    sortDesc = true;
    sortBy: SortingTypes = 'createdat';

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
        this.auditLogService.getAuditLogList(this.filter, pagination, this.sortDesc, this.sortBy)
            .subscribe(list => this.list.setData(list, this.card));
    }

    setSort(sortBy: SortingTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }
        if (this.list) { this.list.filterChanged(); }
    }

    removeItem(id: number): void {
        this.modalService.showQuestion('Smazání záznamu z logu', 'Opravdu si přeješ smazat záznam z logu? Tato akce je nevratná!')
            .onAccept.subscribe(_ => this.auditLogService.removeItem(id).subscribe(__ => this.list.filterChanged()));
    }

    openDetail(item: AuditLogListItem): void {
        const modal = this.modalService.showCustomModal<DetailModalComponent>(DetailModalComponent, 'xl');
        modal.componentInstance.item = item;
    }

    downloadFile(id: number, file: AuditLogFileMetadata): void {
        this.auditLogService.downloadFile(id, file);
    }
}
