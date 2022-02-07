import { PaginatedParams, Dictionary } from './../../../core/models/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { UnverifyListSortTypes, UnverifyLogItem, UnverifyLogParams } from 'src/app/core/models/unverify';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { DataService } from 'src/app/core/services/data.service';
import { CardComponent } from 'src/app/shared/card/card.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChild('card', { static: false }) card: CardComponent;

    sortDesc = true;
    sortBy: UnverifyListSortTypes = 'createdAt';
    channels: Dictionary<string, string>;

    private filter: UnverifyLogParams | null = null;

    constructor(
        private unverifyService: UnverifyService,
        private modalService: ModalService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getChannels().subscribe(channels => this.channels = channels);
    }

    filterChanged(filter: UnverifyLogParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.unverifyService.getUnverifyLog(this.filter, pagination, this.sortBy, this.sortDesc)
            .subscribe(list => this.list.setData(list, this.card));
    }

    setSort(sortBy: UnverifyListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.filterChanged(); }
    }

    recoverState(item: UnverifyLogItem): void {
        this.modalService
            .showQuestion('Obnovení stavu uživatele', 'Opravdu si přejete obnovit tomuto uživateli stav přístupů před unverify?')
            .onAccept.subscribe(_ => this.unverifyService.recoverUnverifyState(item.id).subscribe(__ => this.list.filterChanged()));
    }

    resolveChannelName(id: string): string | null {
        if (!this.channels) { return ''; }
        return this.channels.find(o => o.key === id)?.value ?? '';
    }
}
