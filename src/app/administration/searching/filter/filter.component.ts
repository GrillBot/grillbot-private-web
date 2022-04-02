import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetSearchingListParams } from 'src/app/core/models/searching';
import { StorageService } from 'src/app/core/services/storage.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetSearchingListParams>();
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    get guildId(): string { return this.form.get('guildId').value as string; }

    ngOnInit(): void {
        const filter = GetSearchingListParams.create(
            this.storage.read<GetSearchingListParams>('SearchingListParams')
        ) || GetSearchingListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        const filter = GetSearchingListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetSearchingListParams>('SearchingListParams', filter);
    }

    reset(): void {
        this.form.patchValue(GetSearchingListParams.empty);
    }

    private initFilter(filter: GetSearchingListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelId: [filter.channelId],
            userId: [filter.userId],
            messageQuery: [filter.messageQuery]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }
}
