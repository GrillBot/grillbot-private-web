import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetSuggestionListParams } from 'src/app/core/models/suggestions';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetSuggestionListParams>();

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const filter = GetSuggestionListParams.deserialize(
            this.storage.read<GetSuggestionListParams>('GetSuggestionListParams')
        ) || GetSuggestionListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        const filter = GetSuggestionListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetSuggestionListParams>('GetSuggestionListParams', filter);
    }

    cleanFilter(): void {
        const filter = GetSuggestionListParams.empty;

        this.form.patchValue({
            createdAtFrom: filter.createdAt.from,
            createdAtTo: filter.createdAt.to,
            guildId: filter.guildId,
            fromUserId: filter.fromUserId,
            emoteName: filter.emoteName,
            onlyApprovedToVote: filter.onlyApprovedToVote,
            onlyUnfinishedVotes: filter.onlyUnfinishedVotes,
            onlyCommunityApproved: filter.onlyCommunityApproved
        });
    }

    private initFilter(filter: GetSuggestionListParams): void {
        this.form = this.fb.group({
            createdAtFrom: [filter.createdAt.from],
            createdAtTo: [filter.createdAt.to],
            guildId: [filter.guildId],
            fromUserId: [filter.fromUserId],
            emoteName: [filter.emoteName],
            onlyApprovedToVote: [filter.onlyApprovedToVote],
            onlyUnfinishedVotes: [filter.onlyUnfinishedVotes],
            onlyCommunityApproved: [filter.onlyCommunityApproved]
        });

        this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.submitForm());
    }

}
