import { FormsHelper } from './../../../core/lib/forms';
import { SendMessageToChannelParams, UpdateChannelParams } from './../../../core/models/channels';
import { Dictionary, PaginatedParams } from 'src/app/core/models/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelDetail } from 'src/app/core/models/channels';
import { ModalService } from 'src/app/shared/modal';
import { ChannelService } from 'src/app/core/services/channel.service';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ChannelFlagTexts, ChannelSettingsFlags } from 'src/app/core/models/enums/channel-flags';

@Component({
    selector: 'app-channel-detail',
    templateUrl: './channel-detail.component.html',
    styleUrls: ['./channel-detail.component.scss']
})
export class ChannelDetailComponent implements OnInit {
    @ViewChild('channelStats', { static: false }) channelStats: DataListComponent;

    data: ChannelDetail;
    channelId: string;
    sendMessageForm: FormGroup;
    settingsForm: FormGroup;
    flagsOptions: Dictionary<number, string>;
    settingsSaving = false;

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private modal: ModalService,
        private channelService: ChannelService,
        private router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.channelId = this.activatedRoute.snapshot.params.id as string;
        this.flagsOptions = FormsHelper.createFlagsOptions(ChannelSettingsFlags, ChannelFlagTexts);

        this.channelService.getChannelDetail(this.channelId).subscribe(detail => {
            this.data = detail;

            this.settingsForm = this.fb.group({
                flags: [detail.flags]
            });

            this.settingsForm.valueChanges.subscribe(_ => this.saveSettings());
        });

        this.sendMessageForm = this.fb.group({
            // eslint-disable-next-line @typescript-eslint/unbound-method
            content: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])],
            reference: []
        });
    }

    hasError(controlId: string, errorId: string = null): boolean {
        return ValidationHelper.isInvalid(this.sendMessageForm, controlId, errorId);
    }

    sendMessageSubmit(): void {
        const params = SendMessageToChannelParams.create(this.sendMessageForm.value);

        this.channelService.sendMessageToChannel(this.data.guild.id, this.channelId, params)
            .subscribe(_ => this.modal.showNotification('Odesl??n?? zpr??vy do kan??lu', 'Zpr??va byla ??sp????n?? odesl??na.'));
    }

    cleanCache(): void {
        this.modal.showQuestion(
            'Vy??i??t??n?? cache',
            'Opravdu si p??eje?? vymazat cache? N??kter?? funkce bota pak nemus?? v kan??lu fungovat spr??vn?? (nap??.: logger).'
        ).onAccept.subscribe(_ => {
            this.channelService.removeMessagesFromCache(this.data.guild.id, this.channelId).subscribe(__ => {
                this.modal.showNotification('Vy??i??t??n?? cache', 'Cache byla ??sp????n?? vy??i??t??na.');
            });
        });
    }

    readChannelStats(pagination: PaginatedParams): void {
        const paginatedData = pagination.clone();
        paginatedData.page = Math.max(paginatedData.page - 1, 0);

        this.channelService.getUserStatsOfChannel(this.channelId, paginatedData)
            .subscribe(stats => this.channelStats.setData(stats));
    }

    saveSettings(): void {
        this.settingsSaving = true;

        const params = UpdateChannelParams.create(this.settingsForm.value);
        this.channelService.updateChannel(this.channelId, params)
            .subscribe(_ => this.settingsSaving = false);
    }
}
