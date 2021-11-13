import { AuditLogItemType } from './../../../core/models/enums/audit-log-item-type';
import { Component, Input, OnInit } from '@angular/core';
import { AuditLogListItem } from 'src/app/core/models/audit-log';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
    @Input() item: AuditLogListItem;
    data: any;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    get AuditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }

    get isTextView(): boolean {
        return [AuditLogItemType.Info, AuditLogItemType.Error, AuditLogItemType.Warning].includes(this.item.type);
    }

    get isDiff(): boolean {
        return [
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.MemberRoleUpdated,
            AuditLogItemType.GuildUpdated
        ].includes(this.item.type);
    }

    ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.data = this.item.data;
    }
}
