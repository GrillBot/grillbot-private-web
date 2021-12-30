import { Dictionary } from 'src/app/core/models/common';
import { Support } from '../lib/support';
import { ChannelStatItem } from './channels';
import { DateTime } from './datetime';
import { UserFilterFlags, UserFilterMapping } from './enums/user-filter-flags';
import { UserFlags } from './enums/user-flags';
import { StatusColorMapping, UserStatus, UserStatusTexts } from './enums/user-status';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { Invite, InviteBase } from './invites';

export class User {
    public id: string;
    public username: string;
    public discriminator: string;
    public isBot: boolean;
    public avatarUrl: string;

    get fullUsername(): string {
        return this.discriminator ? `${this.username}#${this.discriminator}` : this.username;
    }

    static create(data: any): User | null {
        if (!data) { return null; }

        const user = new User();

        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        user.id = data.id;
        user.isBot = data.isBot;
        user.avatarUrl = data.avatarUrl;
        user.discriminator = data.discriminator;
        user.username = data.username;
        /* eslint-enable */

        return user;
    }
}

export class GuildUser extends User {
    public usedInvite: Invite | null;
    public points: number;
    public givenReactions: number;
    public obtainedReactions: number;
    public nickname: string | null;

    get fullname(): string {
        return !this.nickname ? this.fullUsername : `${this.nickname} (${this.fullUsername})`;
    }

    static create(data: any): GuildUser | null {
        if (!data) { return null; }
        const base = super.create(data);
        const user = new GuildUser();

        user.avatarUrl = base.avatarUrl;
        user.discriminator = base.discriminator;
        user.givenReactions = data.givenReactions;
        user.id = base.id;
        user.nickname = data.nickname;
        user.obtainedReactions = data.obtainedReactions;
        user.points = data.points;
        user.usedInvite = data.usedInvite ? Invite.create(data.usedInvite) : null;
        user.username = base.username;

        return user;
    }
}

export class UserListItem {
    public id: string;
    public flags: number;
    public haveBirthday: boolean;
    public username: string;
    public guilds: Dictionary<string, boolean>;
    public discordStatus: UserStatus;
    public registeredAt: DateTime;

    // tslint:disable: no-bitwise
    get isBotAdmin(): boolean { return (this.flags & UserFlags.BotAdmin) !== 0; }
    get haveWebAdmin(): boolean { return (this.flags & UserFlags.WebAdmin) !== 0; }
    get isBot(): boolean { return (this.flags & UserFlags.NotUser) !== 0; }
    get isWebAdminOnline(): boolean { return (this.flags & UserFlags.WebAdminOnline) !== 0; }

    get status(): string { return UserStatusTexts[Support.getEnumKeyByValue(UserStatus, this.discordStatus)]; }
    get statusColor(): string { return StatusColorMapping[Support.getEnumKeyByValue(UserStatus, this.discordStatus)]; }

    static create(data: any): UserListItem | null {
        if (!data) { return null; }

        const item = new UserListItem();
        item.id = data.id;
        item.flags = data.flags;
        item.guilds = Object.keys(data.guilds).map(o => ({ key: o, value: data.guilds[o] }));
        item.haveBirthday = data.haveBirthday ?? false;
        item.username = data.username;
        item.discordStatus = data.discordStatus;
        item.registeredAt = data.registeredAt ? DateTime.fromISOString(data.registeredAt) : null;

        return item;
    }
}

export class GetUserListParams {
    public username: string | null = null;
    public guildId: string | null = null;
    public flags = 0;
    public haveBirthday = false;
    public usedInviteCode: string | null;

    get queryParams(): QueryParam[] {
        return [
            this.username ? new QueryParam('username', this.username) : null,
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.flags ? new QueryParam('flags', this.flags) : null,
            new QueryParam('haveBirthday', this.haveBirthday),
            this.usedInviteCode ? new QueryParam('usedInviteCode', this.usedInviteCode) : null
        ].filter(o => o);
    }

    static get empty(): GetUserListParams { return new GetUserListParams(); }

    // tslint:disable: no-bitwise
    static create(form: any): GetUserListParams | null {
        if (!form) { return null; }
        const params = GetUserListParams.empty;

        params.flags = this.buildFlags(form.flags);
        params.guildId = form.guild;
        params.haveBirthday = (form.flags & UserFilterFlags.HaveBirthday) !== 0;
        params.username = form.username;
        params.usedInviteCode = form.usedInviteCode;

        return params;
    }

    private static buildFlags(flags: number): number {
        let result = 0;

        for (const item of UserFilterMapping) {
            if ((flags & item.source) !== 0) {
                result |= item.destination;
            }
        }

        return result;
    }

    private serializeFlags(): number {
        let result = 0;

        if (this.haveBirthday) { result |= UserFilterFlags.HaveBirthday; }

        for (const item of UserFilterMapping) {
            if ((this.flags & item.destination) !== 0) {
                result |= item.source;
            }
        }

        return result;
    }

    serialize(): any {
        return {
            guild: this.guildId,
            flags: this.serializeFlags(),
            username: this.username,
            usedInviteCode: this.usedInviteCode
        };
    }
}

export class UserDetail {
    public id: string;
    public username: string;
    public note: string;
    public flags: number;
    public haveBirthday: boolean;
    public guilds: GuildUserDetail[];
    public emotes: EmoteStatItem[];
    public status: UserStatus;
    public activeClients: string[];
    public isKnown: boolean;
    public avatarUrl: string;
    public selfUnverifyMinimalTime: string | null;
    public registeredAt: DateTime | null;

    // tslint:disable: no-bitwise
    get isBotAdmin(): boolean { return (this.flags & UserFlags.BotAdmin) !== 0; }
    get haveWebAdmin(): boolean { return (this.flags & UserFlags.WebAdmin) !== 0; }
    get isBot(): boolean { return (this.flags & UserFlags.NotUser) !== 0; }

    static create(data: any): UserDetail | null {
        if (!data) { return null; }
        const detail = new UserDetail();

        detail.id = data.id;
        detail.username = data.username;
        detail.note = data.note;
        detail.flags = data.flags;
        detail.haveBirthday = data.haveBirthday ?? false;
        detail.guilds = data.guilds?.map((o: any) => GuildUserDetail.create(o)).filter((o: GuildUserDetail) => o);
        detail.emotes = data.emotes?.map((o: any) => EmoteStatItem.create(o)).filter((o: EmoteStatItem) => o);
        detail.status = data.status;
        detail.activeClients = data.activeClients?.map((o: string) => o);
        detail.isKnown = data.isKnown;
        detail.avatarUrl = data.avatarUrl;
        detail.selfUnverifyMinimalTime = data.selfUnverifyMinimalTime;
        detail.registeredAt = data.registeredAt ? DateTime.fromISOString(data.registeredAt) : null;

        return detail;
    }
}

export class GuildUserDetail {
    public guild: Guild;
    public points: number;
    public givenReactions: number;
    public obtainedReactions: number;
    public nickname: string;
    public usedInvite: Invite | null;
    public createdInvites: InviteBase[];
    public channels: ChannelStatItem[];
    public isGuildKnown: boolean;
    public isUserInGuild: boolean;

    static create(data: any): GuildUserDetail | null {
        if (!data) { return null; }
        const detail = new GuildUserDetail();

        detail.guild = Guild.create(data.guild);
        detail.points = data.points;
        detail.givenReactions = data.givenReactions;
        detail.obtainedReactions = data.obtainedReactions;
        detail.nickname = data.nickname;
        detail.usedInvite = data.usedInvite ? Invite.create(data.usedInvite) : null;
        detail.createdInvites = data.createdInvites?.map((o: any) => InviteBase.create(o)).filter((o: InviteBase) => o);
        detail.channels = data.channels?.map((o: any) => ChannelStatItem.create(o)).filter((o: ChannelStatItem) => o);
        detail.isGuildKnown = data.isGuildKnown;
        detail.isUserInGuild = data.isUserInGuild;

        return detail;
    }
}

export class EmoteStatItem {
    public name: string;
    public useCount: number;
    public imageUrl: string;
    public firstOccurence: DateTime;
    public lastOccurence: DateTime;

    static create(data: any): EmoteStatItem | null {
        if (!data) { return null; }
        const item = new EmoteStatItem();

        item.name = data.name;
        item.useCount = data.useCount;
        item.imageUrl = data.imageUrl;
        item.firstOccurence = DateTime.fromISOString(data.firstOccurence);
        item.lastOccurence = DateTime.fromISOString(data.lastOccurence);

        return item;
    }
}

export class UpdateUserParams {
    constructor(
        public botAdmin: boolean,
        public note: string,
        public webAdminAllowed: boolean,
        public selfUnverifyMinimalTime: string | null
    ) { }
}
