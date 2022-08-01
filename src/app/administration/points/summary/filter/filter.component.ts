import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { GetPointsSummaryParams } from 'src/app/core/models/points';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { StorageService } from 'src/app/core/services/storage.service';
import { ModalService } from 'src/app/shared/modal';
import { GraphModalComponent } from '../graph-modal/graph-modal.component';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetPointsSummaryParams> {
    constructor(
        fb: FormBuilder,
        storage: StorageService,
        private modalService: ModalService
    ) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'PointsSummary';
    }

    deserializeData(data: any): GetPointsSummaryParams {
        return GetPointsSummaryParams.fromForm(data);
    }

    createData(empty: boolean): GetPointsSummaryParams {
        if (empty) {
            return GetPointsSummaryParams.empty;
        } else {
            return GetPointsSummaryParams.fromForm(this.form.value);
        }
    }

    updateForm(filter: GetPointsSummaryParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            userId: filter.userId,
            daysFrom: filter.daysFrom,
            daysTo: filter.daysTo
        });
    }

    initForm(filter: GetPointsSummaryParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            userId: [filter.userId],
            daysFrom: [filter.daysFrom],
            daysTo: [filter.daysTo]
        });
    }

    showGraph(): void {
        const modal = this.modalService.showCustomModal<GraphModalComponent>(GraphModalComponent, 'xl');
        modal.componentInstance.filter = this.createData(false);
    }
}
