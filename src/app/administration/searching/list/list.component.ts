import { SearchingListItem } from './../../../core/models/searching';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetSearchingListParams, SearchingListSortTypes } from 'src/app/core/models/searching';
import { SearchingService } from 'src/app/core/services/searching.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    private filter: GetSearchingListParams;

    sortDesc = true;
    sortBy: SearchingListSortTypes = 'id';

    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChildren('item_check') checkboxes: QueryList<CheckboxComponent>;

    constructor(
        private searchingService: SearchingService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetSearchingListParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.searchingService.getSearchList(this.filter, pagination, this.sortBy, this.sortDesc)
            .subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: SearchingListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.onChange(); }
    }

    removeItems(): void {
        const selectedItems = this.checkboxes.filter(o => o.checked).map(o => parseInt(o.id, 10));
        if (selectedItems.length === 0) { return; }

        this.modalService.showQuestion('Smazat hledání', 'Opravdu si přejete smazat označená hledání?').onAccept.subscribe(_ => {
            this.searchingService.removeSearches(selectedItems).subscribe(_ => this.list.onChange());
        });
    }

    showMessage(item: SearchingListItem): void {
        this.modalService.showNotification('Obsah zprávy', item.message);
    }
}