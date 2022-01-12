import { Support } from '../lib/support';
import { DateTime } from './datetime';
import { ChannelType } from './enums/channel-type';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class Channel {
    public id: string;
    public name: string;
    public type: ChannelType;

    get fullFormat(): string {
        return `#${this.name} (${this.id})`;
    }

    static create(data: any): Channel | null {
        if (!data) { return null; }

        const channel = new Channel();

        channel.name = data.name;
        channel.type = data.type;
        channel.id = data.id;

        return channel;
    }
}

export class ChannelStatItem {
    public channel: Channel;
    public count: number;
    public firstMessageAt: DateTime;
    public lastMessageAt: DateTime;

    static create(data: any): ChannelStatItem | null {
        if (!data) { return null; }
        const item = new ChannelStatItem();

        item.channel = Channel.create(data.channel);
        item.count = data.count;
        item.firstMessageAt = DateTime.fromISOString(data.firstMessageAt);
        item.lastMessageAt = DateTime.fromISOString(data.lastMessageAt);

        return item;
    }
}

export class SendMessageToChannelParams {
    public content: string;
    public reference: string | null;

    static create(form: any): SendMessageToChannelParams | null {
        if (!form) { return null; }
        const params = new SendMessageToChannelParams();

        params.content = form.content;
        params.reference = form.reference;

        return params;
    }
}

export class GetChannelListParams {
    public guildId: string | null = null;
    public nameContains: string | null = null;
    public channelType: ChannelType | null = null;

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.nameContains ? new QueryParam('nameContains', this.nameContains) : null,
            this.channelType != null ? new QueryParam('channelType', this.channelType) : null
        ].filter(o => o);
    }

    static get empty(): GetChannelListParams { return new GetChannelListParams(); }

    static create(form: any): GetChannelListParams | null {
        if (!form) { return null; }
        const params = new GetChannelListParams();

        params.channelType = form.channelType;
        params.guildId = form.guildId;
        params.nameContains = form.nameContains;

        return params;
    }
}

export type ChannelListSortTypes = 'name' | 'type';

export class GuildChannel {
    public id: string;
    public name: string;
    public type: ChannelType;
    public cachedMessagesCount: number;
    public firstMessageAt: DateTime | null;
    public lastMessageAt: DateTime | null;
    public messagesCount: number;
    public guild: Guild;

    get channelTypeName(): string {
        return Support.getEnumKeyByValue(ChannelType, this.type);
    }

    static create(data: any): GuildChannel | null {
        if (!data) { return null; }
        const channel = new GuildChannel();

        channel.id = data.id;
        channel.name = data.name;
        channel.type = data.type;
        channel.cachedMessagesCount = data.cachedMessagesCount;
        channel.firstMessageAt = data.firstMessageAt ? DateTime.fromISOString(data.firstMessageAt) : null;
        channel.lastMessageAt = data.lastMessageAt ? DateTime.fromISOString(data.lastMessageAt) : null;
        channel.messagesCount = data.messagesCount;
        channel.guild = data.guild ? Guild.create(data.guild) : null;

        return channel;
    }
}

export class ChannelDetail extends GuildChannel {
    public flags: number;
    public lastMessageFrom: User | null;
    public mostActiveUser: User | null;
    public parentChannel: Channel | null;

    static create(data: any): ChannelDetail | null {
        if (!data) { return null; }
        const base = super.create(data);
        const detail = new ChannelDetail();

        Object.assign(detail, base);
        detail.flags = data.flags;
        detail.lastMessageFrom = data.lastMessageFrom ? User.create(data.lastMessageFrom) : null;
        detail.mostActiveUser = data.mostActiveUser ? User.create(data.mostActiveUser) : null;
        detail.name = data.name;
        detail.type = data.type;
        detail.parentChannel = data.parentChannel ? Channel.create(data.parentChannel) : null;

        return detail;
    }
}

export class ChannelUserStatItem {
    public position: number;
    public username: string;
    public nickname: string | null;
    public userId: string;
    public count: number;
    public firstMessageAt: DateTime;
    public lastMessageAt: DateTime;

    static create(data: any): ChannelUserStatItem | null {
        if (!data) { return null; }
        const item = new ChannelUserStatItem();

        item.count = data.count;
        item.firstMessageAt = DateTime.fromISOString(data.firstMessageAt);
        item.lastMessageAt = DateTime.fromISOString(data.lastMessageAt);
        item.nickname = data.nickname;
        item.position = data.position;
        item.userId = data.userId;
        item.username = data.username;

        return item;
    }
}
