import { Support } from 'src/app/core/lib/support';
import { AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Channel } from './channels';
import { FilterBase, RangeParams } from './common';
import { DateTime } from './datetime';
import { AuditLogItemType } from './enums/audit-log-item-type';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class TextFilter {
    public text: string | null = null;

    get serialized(): any {
        return {
            text: this.text
        };
    }

    getQueryParams(property: string): QueryParam[] {
        return [
            this.text ? new QueryParam(`${property}.Text`, this.text) : null
        ].filter(o => o);
    }

    static create(data: any): TextFilter | null {
        if (!data) { return null; }
        const filter = new TextFilter();

        filter.text = data.text;

        return filter;
    }
}

export class ExecutionFilter {
    public name: string = null;
    public wasSuccess?: boolean;
    public duration: RangeParams<number>;

    get serialized(): any {
        return {
            name: this.name,
            wasSuccess: this.wasSuccess,
            durationFrom: this.duration?.from,
            durationTo: this.duration?.to
        };
    }

    getQueryParams(property: string): QueryParam[] {
        const params = [
            this.name ? new QueryParam(`${property}.Name`, this.name) : null,
            this.wasSuccess != undefined ? new QueryParam(`${property}.WasSuccess`, this.wasSuccess) : null
        ];

        if (this.duration) {
            if (this.duration.from) {
                params.push(new QueryParam(`${property}.Duration.From`, this.duration.from));
            }

            if (this.duration.to) {
                params.push(new QueryParam(`${property}.Duration.To`, this.duration.to));
            }
        }

        return params.filter(o => o);
    }

    static create(data: any): ExecutionFilter | null {
        if (!data) { return null; }
        const filter = new ExecutionFilter();

        filter.name = data.name;
        filter.wasSuccess = data.wasSuccess;
        filter.duration = {
            from: data.durationFrom,
            to: data.durationTo
        };

        return filter;
    }
}

export class ApiRequestFilter {
    public controllerName: string | null = null;
    public actionName: string | null = null;
    public pathTemplate: string | null = null;
    public duration?: RangeParams<number> | null;
    public method: string | null = null;
    public loggedUserRole: string | null = null;

    get serialized(): any {
        return {
            controllerName: this.controllerName,
            actionName: this.actionName,
            pathTemplate: this.pathTemplate,
            durationFrom: this.duration?.from,
            durationTo: this.duration?.to,
            method: this.method,
            loggedUserRole: this.loggedUserRole
        };
    }

    get queryParams(): QueryParam[] {
        const params = [
            this.controllerName ? new QueryParam('ApiRequestFilter.ControllerName', this.controllerName) : null,
            this.actionName ? new QueryParam('ApiRequestFilter.ActionName', this.actionName) : null,
            this.pathTemplate ? new QueryParam('ApiRequestFilter.PathTemplate', this.pathTemplate) : null,
            this.method ? new QueryParam('ApiRequestFilter.Method', this.method) : null,
            this.loggedUserRole ? new QueryParam('ApiRequestFilter.LoggedUserRole', this.loggedUserRole) : null
        ];

        if (this.duration) {
            if (this.duration.from) {
                params.push(new QueryParam('ApiRequestFilter.Duration.From', this.duration.from));
            }

            if (this.duration.to) {
                params.push(new QueryParam('ApiRequestFilter.Duration.To', this.duration.to));
            }
        }

        return params.filter(o => o);
    }

    static create(data: any): ApiRequestFilter | null {
        if (!data) { return null; }
        const filter = new ApiRequestFilter();

        filter.controllerName = data.controllerName;
        filter.actionName = data.actionName;
        filter.pathTemplate = data.pathTemplate;
        filter.duration = {
            from: data.durationFrom,
            to: data.durationTo
        };
        filter.method = data.method;
        filter.loggedUserRole = data.loggedUserRole;

        return filter;
    }
}

export class AuditLogListParams extends FilterBase {
    public guildId: string | null;
    public processedUserIds: string[] = [];
    public types: AuditLogItemType[] = [];
    public createdFrom: string | null;
    public createdTo: string | null;
    public ignoreBots: boolean;
    public channelId: string | null;
    public ids: string | null;
    public excludedTypes: AuditLogItemType[] = [];
    public infoFilter: TextFilter | null = null;
    public warningFilter: TextFilter | null = null;
    public errorFilter: TextFilter | null = null;

    public commandFilter: ExecutionFilter | null = null;
    public interactionsFilter: ExecutionFilter | null = null;
    public jobFilter: ExecutionFilter | null = null;
    public apiRequestFilter: ApiRequestFilter | null = null;

    static get empty(): AuditLogListParams {
        const params = new AuditLogListParams();
        params.excludedTypes = [AuditLogItemType.API, AuditLogItemType.JobCompleted];

        return params;
    }

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            ...(this.processedUserIds ? this.processedUserIds.map(o => new QueryParam('processedUserIds', o)) : []),
            ...(this.types && this.types.length > 0 ? this.types.map(o => new QueryParam('types', o)) : []),
            ...(this.excludedTypes && this.excludedTypes.length > 0 ? this.excludedTypes.map(o => new QueryParam('excludedTypes', o)) : []),
            this.createdFrom ? new QueryParam('createdFrom', this.createdFrom) : null,
            this.createdTo ? new QueryParam('createdTo', this.createdTo) : null,
            new QueryParam('ignoreBots', this.ignoreBots),
            this.channelId ? new QueryParam('channelId', this.channelId) : null,
            ...super.queryParams,
            ...(this.infoFilter ? this.infoFilter.getQueryParams('InfoFilter') : []),
            ...(this.warningFilter ? this.warningFilter.getQueryParams('WarningFilter') : []),
            ...(this.errorFilter ? this.errorFilter.getQueryParams('ErrorFilter') : []),
            ...(this.commandFilter ? this.commandFilter.getQueryParams('CommandFilter') : []),
            ...(this.interactionsFilter ? this.interactionsFilter.getQueryParams('InteractionFilter') : []),
            ...(this.jobFilter ? this.jobFilter.getQueryParams('JobFilter') : []),
            ...(this.apiRequestFilter ? this.apiRequestFilter.queryParams : []),
            this.ids ? new QueryParam('ids', this.ids) : null
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
            types: this.types,
            excludedTypes: this.excludedTypes,
            infoFilter: this.infoFilter?.serialized,
            warningFilter: this.warningFilter?.serialized,
            errorFilter: this.errorFilter?.serialized,
            commandFilter: this.commandFilter?.serialized,
            interactionsFilter: this.interactionsFilter?.serialized,
            jobFilter: this.jobFilter?.serialized,
            apiRequestFilter: this.apiRequestFilter?.queryParams,
            ids: this.ids
        };
    }

    static create(data: any): AuditLogListParams | null {
        if (!data) { return null; }
        const params = new AuditLogListParams();

        params.guildId = data.guild;
        params.channelId = data.channel;
        params.createdFrom = data.createdFrom;
        params.createdTo = data.createdTo;
        params.ignoreBots = data.ignoreBots ?? false;
        params.processedUserIds = data.processedUsers;
        params.types = data.types;
        params.infoFilter = data.infoFilter ? TextFilter.create(data.infoFilter) : null
        params.warningFilter = data.warningFilter ? TextFilter.create(data.warningFilter) : null;
        params.errorFilter = data.errorFilter ? TextFilter.create(data.errorFilter) : null;
        params.commandFilter = data.commandFilter ? ExecutionFilter.create(data.commandFilter) : null;
        params.interactionsFilter = data.interactionsFilter ? ExecutionFilter.create(data.interactionsFilter) : null;
        params.jobFilter = data.jobFilter ? ExecutionFilter.create(data.jobFilter) : null;
        params.apiRequestFilter = data.apiRequestFilter ? ApiRequestFilter.create(data.apiRequestFilter) : null;
        params.ids = data.ids;
        params.excludedTypes = data.excludedTypes;

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
            AuditLogItemType.ThreadDeleted,
            AuditLogItemType.JobCompleted,
            AuditLogItemType.API
        ];

        return otherTypeWithDetails.includes(this.type);
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
            AuditLogItemType.ThreadDeleted,
            AuditLogItemType.JobCompleted,
            AuditLogItemType.API
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

