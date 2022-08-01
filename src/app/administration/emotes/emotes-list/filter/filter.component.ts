import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { EmotesListParams } from 'src/app/core/models/emotes';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<EmotesListParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'EmotesList';
    }

    deserializeData(data: any): EmotesListParams {
        return EmotesListParams.create(data);
    }

    createData(empty: boolean): EmotesListParams {
        if (empty) {
            return EmotesListParams.empty;
        } else {
            return EmotesListParams.create(this.form.value);
        }
    }

    updateForm(filter: EmotesListParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            useCountFrom: filter.useCountFrom,
            useCountTo: filter.useCountTo,
            firstOccurenceFrom: filter.firstOccurenceFrom,
            firstOccurenceTo: filter.firstOccurenceTo,
            lastOccurenceFrom: filter.lastOccurenceFrom,
            lastOccurenceTo: filter.lastOccurenceTo,
            filterAnimated: filter.filterAnimated,
            emoteName: filter.emoteName
        });
    }

    initForm(filter: EmotesListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            useCountFrom: [filter.useCountFrom, Validators.min(0)],
            useCountTo: [filter.useCountTo, Validators.min(0)],
            firstOccurenceFrom: [filter.firstOccurenceFrom],
            firstOccurenceTo: [filter.firstOccurenceTo],
            lastOccurenceFrom: [filter.lastOccurenceFrom],
            lastOccurenceTo: [filter.lastOccurenceTo],
            filterAnimated: [filter.filterAnimated],
            emoteName: [filter.emoteName]
        });
    }
}
