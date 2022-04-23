import { Component, ViewChild } from '@angular/core';
import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { GetReminderListParams, RemindListSortTypes, RemindMessage } from 'src/app/core/models/reminder';
import { ReminderService } from 'src/app/core/services/reminder.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { orderBy: 'Id', descending: true };

    private filter: GetReminderListParams;

    constructor(
        private reminderService: ReminderService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetReminderListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.reminderService.getReminderList(this.filter).subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: RemindListSortTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.filterChanged(); }
    }

    cancel(item: RemindMessage, notify: boolean): void {
        let message = `Opravdu si přeješ zrušit oznámení pro uživatele ${item.toUser?.fullUsername}? `;
        if (notify) { message += 'Uživateli přijde předčasně oznámení.'; }

        this.modalService.showQuestion('Zrušení upozornění', message).onAccept.subscribe(_ => {
            this.reminderService.cancelRemind(item.id, notify).subscribe(__ => this.list.filterChanged());
        });
    }

    showMessage(item: RemindMessage): void {
        this.modalService.showNotification(`Obsah notifikace #${item.id}`, item.message);
    }
}
