import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { StorageService } from 'src/app/core/services/storage.service';
import { GetPointTransactionsParams } from 'src/app/core/models/points';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetPointTransactionsParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'PointTransactions';
    }

    deserializeData(data: any): GetPointTransactionsParams {
        return GetPointTransactionsParams.fromForm(data);
    }

    createData(empty: boolean): GetPointTransactionsParams {
        if (empty) {
            return GetPointTransactionsParams.empty;
        } else {
            return GetPointTransactionsParams.fromForm(this.form.value);
        }
    }

    updateForm(filter: GetPointTransactionsParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            userId: filter.userId,
            assignedAtFrom: filter.assingnedAtFrom,
            assignedAtTo: filter.assingnedAtTo,
            onlyReactions: filter.onlyReactions,
            onlyMessages: filter.onlyMessages,
            messageId: filter.messageId
        });
    }

    initForm(filter: GetPointTransactionsParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            userId: [filter.userId],
            assignedAtFrom: [filter.assingnedAtFrom],
            assignedAtTo: [filter.assingnedAtTo],
            onlyReactions: [filter.onlyReactions],
            onlyMessages: [filter.onlyMessages],
            messageId: [filter.messageId]
        });

        this.form.get('onlyReactions').valueChanges.subscribe(onlyReactions => {
            if (onlyReactions) {
                this.form.get('onlyMessages').setValue(false, { emitEvent: false });
            }
        });

        this.form.get('onlyMessages').valueChanges.subscribe(onlyMessages => {
            if (onlyMessages) {
                this.form.get('onlyReactions').setValue(false, { emitEvent: false });
            }
        });
    }
}
