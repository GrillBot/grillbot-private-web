import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmotesListParams } from 'src/app/core/models/emotes';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<EmotesListParams>();

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const filter = EmotesListParams.deserialize(this.storage.read<EmotesListParams>('EmotesListParams')) || EmotesListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        const filter = EmotesListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<EmotesListParams>('EmotesListParams', filter);
    }

    cleanFilter(): void {
        const filter = EmotesListParams.empty;

        this.form.patchValue({
            guildId: filter.guildId,
            useCountFrom: filter.useCount.from,
            useCountTo: filter.useCount.to,
            firstOccurenceFrom: filter.firstOccurence.from,
            firstOccurenceTo: filter.firstOccurence.to,
            lastOccurenceFrom: filter.lastOccurence.from,
            lastOccurenceTo: filter.lastOccurence.to,
            filterAnimated: filter.filterAnimated,
            emoteName: filter.emoteName
        });
    }

    private initFilter(filter: EmotesListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            useCountFrom: [filter.useCount.from, Validators.min(0)],
            useCountTo: [filter.useCount.to, Validators.min(0)],
            firstOccurenceFrom: [filter.firstOccurence.from],
            firstOccurenceTo: [filter.firstOccurence.to],
            lastOccurenceFrom: [filter.lastOccurence.from],
            lastOccurenceTo: [filter.lastOccurence.to],
            filterAnimated: [filter.filterAnimated],
            emoteName: [filter.emoteName]
        });

        this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.submitForm());
    }
}
