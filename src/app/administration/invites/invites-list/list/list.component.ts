import { Component, ViewChild } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetInviteListParams, InviteListSortTypes } from 'src/app/core/models/invites';
import { InviteService } from 'src/app/core/services/invite.service';
import { CardComponent } from 'src/app/shared/card/card.component';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChild('card', { static: false }) card: CardComponent;

    sortDesc = true;
    sortBy: InviteListSortTypes = 'createdAt';

    private filter: GetInviteListParams;

    constructor(
        private inviteService: InviteService
    ) { }

    filterChanged(filter: GetInviteListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        this.inviteService.getInviteList(this.filter, pagination, this.sortDesc, this.sortBy)
            .subscribe(list => this.list.setData(list, this.card));
    }

    setSort(sortBy: InviteListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.filterChanged(); }
    }
}
