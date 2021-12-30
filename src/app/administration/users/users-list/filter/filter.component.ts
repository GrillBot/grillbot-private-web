import { Dictionary } from './../../../../core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { GetUserListParams } from 'src/app/core/models/users';
import { StorageService } from 'src/app/core/services/storage.service';
import { Support } from 'src/app/core/lib/support';
import { UserFilterFlags, UserFilterFlagsTexts } from 'src/app/core/models/enums/user-filter-flags';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetUserListParams>();

    form: FormGroup;
    flagsMask: Dictionary<number, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.flagsMask = Object.keys(UserFilterFlags)
            .map(o => parseInt(o, 10))
            .filter(o => !isNaN(o) && o > 0)
            .map(o => ({
                key: o,
                value: UserFilterFlagsTexts[Support.getEnumKeyByValue(UserFilterFlags, o)] as string
            }));

        const filter = GetUserListParams.create(this.storage.read<GetUserListParams>('UserListFilter')) || GetUserListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        const filter = GetUserListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.storage.store<GetUserListParams>('UserListFilter', filter.serialize());
    }

    reset(): void {
        const filter = GetUserListParams.empty;

        this.form.patchValue({
            username: filter.username,
            guild: filter.guildId,
            flags: filter.flags,
            usedInviteCode: filter.usedInviteCode
        });
    }

    private initFilter(filter: GetUserListParams): void {
        this.form = this.fb.group({
            username: [filter.username],
            guild: [filter.guildId],
            flags: [filter.flags],
            usedInviteCode: [filter.usedInviteCode]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }
}
