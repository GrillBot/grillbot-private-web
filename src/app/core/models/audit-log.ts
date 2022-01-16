import { Support } from 'src/app/core/lib/support';
import { AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Channel } from './channels';
import { DateTime } from './datetime';
import { AuditLogItemType } from './enums/audit-log-item-type';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class AuditLogListParams {
    public guildId: string | null;
    public processedUserIds: string[] = [];
    public types: AuditLogItemType[] = [];
    public createdFrom: string | null;
    public createdTo: string | null;
    public ignoreBots: boolean;
    public channelId: string | null;

    static get empty(): AuditLogListParams { return new AuditLogListParams(); }

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            ...(this.processedUserIds ? this.processedUserIds.map(o => new QueryParam('processedUserIds', o)) : []),
            ...(this.types && this.types.length > 0 ? this.types.map(o => new QueryParam('types', o)) : []),
            this.createdFrom ? new QueryParam('createdFrom', this.createdFrom) : null,
            this.createdTo ? new QueryParam('createdTo', this.createdTo) : null,
            new QueryParam('ignoreBots', this.ignoreBots),
            this.channelId ? new QueryParam('channelId', this.channelId) : null
        ].filter(o => o);
    }

    get serialized(): any {
        return {
            guild: this.guildId,
            channel: this.channelId,
            createdFrom: this.createdFrom,
            createdTo: this.createdTo,
            ignoreBots: this.ignoreBots ?? false,
            processedUsers: this.processedUserIds,
            types: this.types
        };
    }

    static create(form: any): AuditLogListParams | null {
        if (!form) { return null; }
        const params = new AuditLogListParams();

        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        params.guildId = form.guild;
        params.channelId = form.channel;
        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.ignoreBots = form.ignoreBots ?? false;
        params.processedUserIds = form.processedUsers;
        params.types = form.types;

        return params;
    }
}

export class AuditLogListItem {
    public id: number;
    public createdAt: DateTime;
    public guild: Guild | null;
    public processedUser: User | null;
    public discordAuditLogItemIds: string[] | null;
    public type: AuditLogItemType;
    public channel: Channel | null;
    public files: AuditLogFileMetadata[];
    public data: any;

    get title(): string {
        return AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, this.type)] as string;
    }

    get canOpenDetail(): boolean {
        const textTypes = [
            AuditLogItemType.Info,
            AuditLogItemType.Error,
            AuditLogItemType.Warning
        ];

        if (textTypes.includes(this.type) && (this.data as string).length > 1000) { return true; }

        const otherTypeWithDetails = [
            AuditLogItemType.Command,
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.GuildUpdated,
            AuditLogItemType.InteractionCommand,
            AuditLogItemType.ThreadDeleted
        ];

        if (otherTypeWithDetails.includes(this.type)) { return true; }
        return false;
    }

    get canShowColumn(): boolean {
        const types = [
            AuditLogItemType.Command,
            AuditLogItemType.ChannelCreated,
            AuditLogItemType.ChannelDeleted,
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.EmojiDeleted,
            AuditLogItemType.OverwriteCreated,
            AuditLogItemType.OverwriteDeleted,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.Unban,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.MemberRoleUpdated,
            AuditLogItemType.GuildUpdated,
            AuditLogItemType.UserLeft,
            AuditLogItemType.UserJoined,
            AuditLogItemType.MessageDeleted,
            AuditLogItemType.InteractionCommand,
            AuditLogItemType.ThreadDeleted
        ];

        return types.includes(this.type);
    }

    static create(data: any): AuditLogListItem | null {
        if (!data) { return null; }
        const item = new AuditLogListItem();

        item.id = data.id;
        item.createdAt = DateTime.fromISOString(data.createdAt as string);
        item.guild = data.guild ? Guild.create(data.guild) : null;
        item.processedUser = data.processedUser ? User.create(data.processedUser) : null;
        item.discordAuditLogItemIds = data.discordAuditLogItemId;
        item.type = data.type;
        item.channel = data.channel ? Channel.create(data.channel) : null;
        item.files = (data.files as any[]).map((o: any) => AuditLogFileMetadata.create(o)).filter((o: AuditLogFileMetadata) => o);
        item.data = data.data;

        return item;
    }
}

export class AuditLogFileMetadata {
    public id: number;
    public filename: string;
    public size: number;

    static create(data: any): AuditLogFileMetadata | null {
        if (!data) { return null; }
        const metadata = new AuditLogFileMetadata();

        metadata.id = data.id;
        metadata.size = data.size;
        metadata.filename = data.filename;

        return metadata;
    }
}

export type SortingTypes = 'guild' | 'processed' | 'type' | 'channel' | 'createdat';

