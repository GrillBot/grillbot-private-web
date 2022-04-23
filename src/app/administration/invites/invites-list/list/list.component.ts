import { SortParams } from './../../../../core/models/common';
import { Component, ViewChild } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetInviteListParams, InviteListSortTypes } from 'src/app/core/models/invites';
import { InviteService } from 'src/app/core/services/invite.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { orderBy: 'CreatedAt', descending: true };

    private filter: GetInviteListParams;

    constructor(
        private inviteService: InviteService
    ) { }

    filterChanged(filter: GetInviteListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.inviteService.getInviteList(this.filter).subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: InviteListSortTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.filterChanged(); }
    }
}
