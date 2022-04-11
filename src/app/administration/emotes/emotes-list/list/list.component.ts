import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatedParams, PaginatedResponse, SortParams } from 'src/app/core/models/common';
import { EmotesListParams, EmoteStatItem, SortingTypes } from 'src/app/core/models/emotes';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { CardComponent } from 'src/app/shared/card/card.component';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { MergeModalComponent } from '../../merge-modal/merge-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChild('card', { static: false }) card: CardComponent;

    sort: SortParams = { orderBy: 'UseCount', descending: true };
    unsupported = false;

    private filter: EmotesListParams;

    constructor(
        private emotesService: EmotesService,
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute
    ) { }

    filterChanged(filter: EmotesListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    ngOnInit(): void {
        this.unsupported = this.activatedRoute.snapshot.routeConfig.path === 'unsupported';
    }

    readData(pagination: PaginatedParams): void {
        const parameters = this.filter
            .setPagination(pagination)
            .setSort(this.sort);

        let request: Observable<PaginatedResponse<EmoteStatItem>>;
        if (this.unsupported) {
            request = this.emotesService.getStatsOfUnsupportedEmotes(parameters);
        } else {
            request = this.emotesService.getStatsOfSupportedEmotes(parameters);
        }

        request.subscribe(data => this.list.setData(data));
    }

    setSort(sortBy: SortingTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.filterChanged(); }
    }

    mergeStatsToAnother(row: EmoteStatItem): void {
        const modal = this.modalService.showCustomModal<MergeModalComponent>(MergeModalComponent);
        modal.componentInstance.sourceItem = row;

        const mergedSub = modal.componentInstance.merged.subscribe(_ => this.list.filterChanged());
        modal.onClose.subscribe(_ => mergedSub.unsubscribe());
    }

    removeStats(row: EmoteStatItem): void {
        this.modalService.showQuestion(
            'Smazání statistiky',
            `Opravdu si přeješ smazat statistiku pro emote "${row.emote.name}"? <b>Tato akce je nevratná!</b>`
        ).onAccept.subscribe(_ => {
            this.emotesService.removeStatistics(row.emote.fullId).subscribe(rowsChanged => {
                this.modalService.showNotification(
                    'Smazání statistiky',
                    `Statistika byla úspěšně smazána. Počet smazaných záznamů: ${rowsChanged.toLocaleString()}`
                ).onClose.subscribe(() => this.list.filterChanged());
            });
        });
    }
}
