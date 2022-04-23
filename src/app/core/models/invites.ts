import { FilterBase } from './common';
import { QueryParam } from './http';
import { DateTime } from './datetime';
import { Guild } from './guilds';
import { User } from './users';

export class InviteBase {
    public code: string;
    public createdAt?: DateTime;

    static create(data: any): InviteBase | null {
        if (!data) { return null; }
        const item = new InviteBase();

        item.code = data.code;
        item.createdAt = data.createdAt ? DateTime.fromISOString(data.createdAt) : null;

        return item;
    }
}

export class Invite extends InviteBase {
    public creator: User;
    public usedUsersCount: number;

    static create(data: any): Invite {
        if (!data) { return null; }
        const base = super.create(data);
        const invite = new Invite();

        invite.code = base.code;
        invite.createdAt = base.createdAt;
        invite.creator = data.creator ? User.create(data.creator) : null;
        invite.usedUsersCount = data.usedUsersCount;

        return invite;
    }
}

export class GuildInvite extends Invite {
    public guild: Guild;

    static create(data: any): GuildInvite | null {
        if (!data) { return null; }
        const base = super.create(data);
        const invite = new GuildInvite();

        invite.code = base.code;
        invite.createdAt = base.createdAt;
        invite.creator = base.creator;
        invite.guild = data.guild ? Guild.create(data.guild) : null;
        invite.usedUsersCount = base.usedUsersCount;

        return invite;
    }
}

export class GetInviteListParams extends FilterBase {
    public guildId: string | null = null;
    public creatorId: string | null = null;
    public code: string | null = null;
    public createdFrom: string | null = null;
    public createdTo: string | null = null;

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.creatorId ? new QueryParam('creatorId', this.creatorId) : null,
            this.code ? new QueryParam('code', this.code) : null,
            this.createdFrom ? new QueryParam('createdFrom', this.createdFrom) : null,
            this.createdTo ? new QueryParam('createdTo', this.createdTo) : null,
            ...super.queryParams
        ].filter(o => o);
    }

    static get empty(): GetInviteListParams { return new GetInviteListParams(); }

    static create(form: any): GetInviteListParams | null {
        if (!form) { return null; }
        const params = new GetInviteListParams();

        params.code = form.code;
        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.creatorId = form.creatorId;
        params.guildId = form.guildId;

        return params;
    }
}

export type InviteListSortTypes = 'code' | 'createdAt' | 'creator';
