import { QueryParam } from './http';
import { Channel } from './channels';
import { DateTime } from './datetime';
import { PremiumTier } from './enums/premium-tier';
import { Role } from './roles';
import { User } from './users';

export class GuildListFilter {
    public nameQuery: string | null;

    static get empty(): GuildListFilter { return new GuildListFilter(); }

    get queryParams(): QueryParam[] {
        return [
            this.nameQuery ? new QueryParam('nameQuery', this.nameQuery) : null,
        ].filter(o => o);
    }

    static create(form: any): GuildListFilter | null {
        if (!form) { return null; }
        const item = new GuildListFilter();

        item.nameQuery = form.nameQuery;
        return item;
    }
}

export class Guild {
    public id: string;
    public name: string;
    public memberCount: number;
    public isConnected: boolean;

    static create(data: any): Guild {
        const item = new Guild();

        item.id = data.id;
        item.name = data.name;
        item.memberCount = data.memberCount;
        item.isConnected = data.isConnected ?? false;

        return item;
    }
}

export class GuildDetail extends Guild {
    public createdAt?: DateTime;
    public iconUrl?: string;
    public owner?: User;
    public premiumTier: PremiumTier;
    public vanityUrl?: string;
    public mutedRole?: Role;
    public boosterRole?: Role;
    public adminChannel?: Channel;
    public maxMembers?: number;
    public maxPresences?: number;
    public maxVideoChannelUsers?: number;
    public maxBitrate: number;
    public maxUploadLimit: number;

    static create(data: any): GuildDetail | null {
        if (!data) { return null; }
        const base = super.create(data);

        const guild = new GuildDetail();
        guild.id = base.id;
        guild.name = base.name;
        guild.memberCount = base.memberCount;
        guild.iconUrl = data.iconUrl;
        guild.isConnected = base.isConnected;
        guild.premiumTier = data.premiumTier;
        guild.vanityUrl = data.vanityUrl;
        guild.maxMembers = data.maxMembers;
        guild.maxPresences = data.maxPresences;
        guild.maxVideoChannelUsers = data.maxVideoChannelUsers;
        guild.maxBitrate = data.maxBitrate;
        guild.maxUploadLimit = data.maxUploadLimit;

        if (data.adminChannel) { guild.adminChannel = Channel.create(data.adminChannel); }
        if (data.createdAt) { guild.createdAt = DateTime.fromISOString(data.createdAt); }
        if (data.boosterRole) { guild.boosterRole = Role.create(data.boosterRole); }
        if (data.mutedRole) { guild.mutedRole = Role.create(data.mutedRole); }
        if (data.owner) { guild.owner = User.create(data.owner); }

        return guild;
    }
}

export class UpdateGuildParams {
    constructor(
        public muteRoleId: string,
        public adminChannelId: string
    ) { }
}
