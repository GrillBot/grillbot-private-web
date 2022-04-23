import { SearchingListItem } from './../../../core/models/searching';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { GetSearchingListParams, SearchingListSortTypes } from 'src/app/core/models/searching';
import { SearchingService } from 'src/app/core/services/searching.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { SearchingDetailComponent } from '../searching-detail/searching-detail.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChildren('item_check') checkboxes: QueryList<CheckboxComponent>;
    @ViewChild('card', { static: false }) card: CardComponent;

    sort: SortParams = { orderBy: 'Id', descending: true };

    private filter: GetSearchingListParams;

    constructor(
        private searchingService: SearchingService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetSearchingListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.searchingService.getSearchList(this.filter).subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: SearchingListSortTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.filterChanged(); }
    }

    removeItems(): void {
        const selectedItems = this.checkboxes.filter(o => o.checked).map(o => parseInt(o.id, 10));
        if (selectedItems.length === 0) { return; }

        this.modalService.showQuestion('Smazat hledání', 'Opravdu si přejete smazat označená hledání?').onAccept.subscribe(_ => {
            this.searchingService.removeSearches(selectedItems).subscribe(__ => this.list.filterChanged());
        });
    }

    showMessage(item: SearchingListItem, event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const modal = this.modalService.showCustomModal<SearchingDetailComponent>(SearchingDetailComponent, 'xl');
        modal.componentInstance.item = item;
    }
}
