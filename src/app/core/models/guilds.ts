import { QueryParam } from './http';
import { Channel } from './channels';
import { DateTime } from './datetime';
import { PremiumTier } from './enums/premium-tier';
import { Role } from './roles';
import { User } from './users';
import { FilterBase } from './common';

export class GuildListFilter extends FilterBase {
    public nameQuery: string | null;

    static get empty(): GuildListFilter { return new GuildListFilter(); }

    get queryParams(): QueryParam[] {
        return [
            this.nameQuery ? new QueryParam('nameQuery', this.nameQuery) : null,
            ...super.queryParams
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

export class ClientTypeReport {
    public desktop: number;
    public mobile: number;
    public web: number;

    static create(data: any): ClientTypeReport | null {
        if (!data) { return null; }

        const report = new ClientTypeReport();
        report.desktop = data.Desktop ?? 0;
        report.mobile = data.Mobile ?? 0;
        report.web = data.Web ?? 0;

        return report;
    }
}

export class GuildDatabaseReport {
    public auditLogs: number;
    public channels: number;
    public invites: number;
    public searches: number;
    public unverifies: number;
    public unverifyLogs: number;
    public users: number;
    public cacheIndexes: number;

    static create(data: any): GuildDatabaseReport | null {
        if (!data) { return null; }

        const report = new GuildDatabaseReport();
        report.auditLogs = data.auditLogs ?? 0;
        report.channels = data.channels ?? 0;
        report.invites = data.invites ?? 0;
        report.searches = data.searches ?? 0;
        report.unverifies = data.unverifies ?? 0;
        report.unverifyLogs = data.unverifyLogs ?? 0;
        report.users = data.users ?? 0;
        report.cacheIndexes = data.cacheIndexes ?? 0;

        return report;
    }
}

export class UserStatusReport {
    public online: number;
    public offline: number;
    public idle: number;
    public doNotDisturb: number;

    static create(data: any): UserStatusReport | null {
        if (!data) { return null; }
        const report = new UserStatusReport();

        report.online = data.Online ?? 0;
        report.idle = data.Idle ?? 0;
        report.doNotDisturb = data.DoNotDisturb ?? 0;
        report.offline = data.offline ?? 0;

        return report;
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
    public emoteSuggestionChannel?: Channel;
    public voteChannel?: Channel;
    public maxMembers?: number;
    public maxPresences?: number;
    public maxVideoChannelUsers?: number;
    public maxBitrate: number;
    public maxUploadLimit: number;
    public clientTypeReport?: ClientTypeReport;
    public databaseReport?: GuildDatabaseReport;
    public userStatusReport?: UserStatusReport;

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
        if (data.emoteSuggestionChannel) { guild.emoteSuggestionChannel = Channel.create(data.emoteSuggestionChannel); }
        if (data.voteChannel) { guild.voteChannel = Channel.create(data.voteChannel); }
        if (data.mutedRole) { guild.mutedRole = Role.create(data.mutedRole); }
        if (data.owner) { guild.owner = User.create(data.owner); }
        if (data.clientTypeReport) { guild.clientTypeReport = ClientTypeReport.create(data.clientTypeReport); }
        if (data.databaseReport) { guild.databaseReport = GuildDatabaseReport.create(data.databaseReport); }
        if (data.userStatusReport) { guild.userStatusReport = UserStatusReport.create(data.userStatusReport); }

        return guild;
    }
}

export class UpdateGuildParams {
    constructor(
        public muteRoleId: string,
        public adminChannelId: string,
        public emoteSuggestionChannelId: string,
        public voteChannelId: string
    ) { }
}
