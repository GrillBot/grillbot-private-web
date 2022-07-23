import { SuggestionDetailModalComponent } from './../../suggestion-detail-modal/suggestion-detail-modal.component';
import { EmoteSuggestion, GetSuggestionListParams } from './../../../../core/models/suggestions';
import { Component, ViewChild } from '@angular/core';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { EmoteSuggestionService } from 'src/app/core/services/emote-suggestion.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { descending: true };

    private filter: GetSuggestionListParams;

    constructor(
        private suggestionService: EmoteSuggestionService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetSuggestionListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.suggestionService.getSuggestionList(this.filter).subscribe(data => this.list.setData(data));
    }

    setSort(): void {
        this.sort.descending = !this.sort.descending;
        if (this.list) { this.list.filterChanged(); }
    }

    showDetail(suggestion: EmoteSuggestion): void {
        const modal = this.modalService.showCustomModal<SuggestionDetailModalComponent>(SuggestionDetailModalComponent);
        modal.componentInstance.suggestion = suggestion;
    }
}
