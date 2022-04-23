import { Component, ViewChild } from '@angular/core';
import { ChannelListSortTypes, GetChannelListParams } from 'src/app/core/models/channels';
import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { ChannelService } from 'src/app/core/services/channel.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { orderBy: 'Name', descending: false };

    private filter: GetChannelListParams;

    constructor(
        private channelService: ChannelService
    ) { }

    filterChanged(filter: GetChannelListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.channelService.getChannelsList(this.filter).subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: ChannelListSortTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.filterChanged(); }
    }
}
