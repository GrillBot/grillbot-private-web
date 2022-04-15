import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuildDetail, UpdateGuildParams } from 'src/app/core/models/guilds';
import { GuildService } from 'src/app/core/services/guild.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-guild-detail',
    templateUrl: './guild-detail.component.html',
    styleUrls: ['./guild-detail.component.scss']
})
export class GuildDetailComponent implements OnInit {
    data: GuildDetail;
    form: FormGroup;

    constructor(
        private guildService: GuildService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private modal: ModalService
    ) { }

    ngOnInit(): void {
        const guildId: string = this.activatedRoute.snapshot.params.id as string;

        this.guildService.getGuildDetail(guildId).subscribe(detail => {
            this.data = detail;

            this.form = this.fb.group({
                mutedRole: [this.data.mutedRole?.id ?? null],
                adminChannel: [this.data.adminChannel?.id ?? null],
                emoteSuggestionChannel: [this.data.emoteSuggestionChannel?.id ?? null]
            });
        });
    }

    submitSettings(): void {
        /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
        const params = new UpdateGuildParams(
            this.form.value.mutedRole,
            this.form.value.adminChannel,
            this.form.value.emoteSuggestionChannel
        );

        this.guildService.updateGuild(this.data.id, params).subscribe(_ => {
            this.modal.showNotification('Změna nastavení serveru', 'Nastavení serveru bylo úspěšně provedeno.');
        });
    }

}
