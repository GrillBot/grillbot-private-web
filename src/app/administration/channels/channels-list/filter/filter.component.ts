import { Dictionary } from 'src/app/core/models/common';
import { GetChannelListParams } from './../../../../core/models/channels';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { ChannelType } from 'src/app/core/models/enums/channel-type';
import { Support } from 'src/app/core/lib/support';
import { debounceTime } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetChannelListParams>();

    form: FormGroup;

    channelTypes: Dictionary<number, string>;
    guilds: Dictionary<string, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.channelTypes = Object.keys(ChannelType).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: Support.getEnumKeyByValue(ChannelType, o) }));
        this.dataService.getGuilds().subscribe(guilds => this.guilds = guilds);

        const filter = GetChannelListParams.create(
            this.storage.read<GetChannelListParams>('ChannelListParams') || GetChannelListParams.empty);

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GetChannelListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelType: [filter.channelType],
            nameContains: [filter.nameContains]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = GetChannelListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetChannelListParams>('ChannelListParams', filter);
    }

    reset(): void {
        const empty = GetChannelListParams.empty;

        this.form.patchValue({
            guildId: empty.guildId,
            channelType: empty.channelType,
            nameContains: empty.nameContains
        });
    }

}
