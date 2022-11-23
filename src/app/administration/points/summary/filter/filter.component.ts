import { ActivatedRoute } from '@angular/router';
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
        private modalService: ModalService,
        private route: ActivatedRoute
    ) {
        super(fb, storage);
    }

    get isMerged(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.route.snapshot.data?.merged ?? false;
    }

    get guildId(): string | null { return this.form?.get('guildId')?.value as string; }

    configure(): void {
        this.filterId = 'PointsSummary' + (this.isMerged ? '-Merged' : '');
    }

    deserializeData(data: any): GetPointsSummaryParams {
        return GetPointsSummaryParams.fromForm(data);
    }

    createData(empty: boolean): GetPointsSummaryParams {
        const data = empty ? GetPointsSummaryParams.empty : GetPointsSummaryParams.fromForm(this.form.value);
        data.merged = this.isMerged;

        return data;
    }

    updateForm(filter: GetPointsSummaryParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            userId: filter.userId,
            daysFrom: filter.days?.from,
            daysTo: filter.days?.to
        });
    }

    initForm(filter: GetPointsSummaryParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            userId: [filter.userId],
            daysFrom: [filter.days?.from],
            daysTo: [filter.days?.to]
        });
    }

    showGraph(): void {
        const modal = this.modalService.showCustomModal<GraphModalComponent>(GraphModalComponent, 'xl');
        modal.componentInstance.filter = this.createData(false);
        modal.componentInstance.isMerged = this.isMerged;
    }
}
