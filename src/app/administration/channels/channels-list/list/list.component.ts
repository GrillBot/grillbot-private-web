import { Component, ViewChild } from '@angular/core';
import { ChannelListSortTypes, GetChannelListParams } from 'src/app/core/models/channels';
import { PaginatedParams } from 'src/app/core/models/common';
import { ChannelService } from 'src/app/core/services/channel.service';
import { CardComponent } from 'src/app/shared/card/card.component';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChild('card', { static: false }) card: CardComponent;

    sortDesc = false;
    sortBy: ChannelListSortTypes = 'name';

    private filter: GetChannelListParams;

    constructor(
        private channelService: ChannelService
    ) { }

    filterChanged(filter: GetChannelListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        this.channelService.getChannelsList(this.filter, pagination, this.sortBy, this.sortDesc)
            .subscribe(list => this.list.setData(list, this.card));
    }

    setSort(sortBy: ChannelListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.filterChanged(); }
    }
}
