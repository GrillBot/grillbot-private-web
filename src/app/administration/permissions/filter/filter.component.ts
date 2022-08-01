import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { GetExplicitPermissionListParams } from 'src/app/core/models/permissions';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetExplicitPermissionListParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'ExplicitPermissionList';
    }

    deserializeData(data: any): GetExplicitPermissionListParams {
        return GetExplicitPermissionListParams.create(data);
    }

    createData(empty: boolean): GetExplicitPermissionListParams {
        if (empty) {
            return GetExplicitPermissionListParams.empty;
        } else {
            return GetExplicitPermissionListParams.create(this.form.value);
        }
    }

    initForm(filter: GetExplicitPermissionListParams): void {
        this.form = this.fb.group({
            searchQuery: [filter.searchQuery]
        });
    }

    updateForm(filter: GetExplicitPermissionListParams): void {
        this.form.patchValue({
            searchQuery: [filter.searchQuery]
        });
    }
}
