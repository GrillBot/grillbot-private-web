import { GuildListFilter } from './../../../../core/models/guilds';
import { Component, ViewChild } from '@angular/core';
import { GuildService } from 'src/app/core/services/guild.service';
import { PaginatedParams } from 'src/app/core/models/common';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { CardComponent } from 'src/app/shared/card/card.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChild('card', { static: false }) card: CardComponent;

    private filter: GuildListFilter;

    constructor(
        private guildService: GuildService
    ) { }

    filterChanged(filter: GuildListFilter): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        this.guildService.getGuildList(this.filter, pagination)
            .subscribe(response => this.list.setData(response, this.card));
    }
}
