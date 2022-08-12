import { FilterBase } from './common';
import { DateTime } from './datetime';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class PointsMergeInfo {
    public mergeRangeFrom: DateTime;
    public mergeRangeTo: DateTime | null;
    public mergedItemsCount: number;

    static create(data: any): PointsMergeInfo | null {
        if (!data) { return null; }

        const info = new PointsMergeInfo();
        info.mergeRangeFrom = DateTime.fromISOString(data.mergeRangeFrom);
        info.mergeRangeTo = data.mergeRangeTo ? DateTime.fromISOString(data.mergeRangeTo) : null;
        info.mergedItemsCount = data.mergedItemsCount;

        return info;
    }
}

export class PointsTransaction {
    public guild: Guild;
    public user: User;
    public messageId: string;
    public isReaction: boolean;
    public assignedAt: DateTime;
    public points: number;
    public mergeInfo: PointsMergeInfo | null;

    static create(data: any): PointsTransaction | null {
        if (!data) { return null; }

        const transaction = new PointsTransaction();
        transaction.assignedAt = DateTime.fromISOString(data.assignedAt);
        transaction.guild = Guild.create(data.guild);
        transaction.isReaction = data.isReaction;
        transaction.messageId = data.messageId;
        transaction.points = data.points;
        transaction.user = User.create(data.user);
        transaction.mergeInfo = data.mergeInfo ? PointsMergeInfo.create(data.mergeInfo) : null;

        return transaction;
    }
}

export class PointsSummaryBase {
    public day: DateTime;
    public messagePoints: number;
    public reactionPoints: number;
    public totalPoints: number;

    static create(data: any): PointsSummaryBase | null {
        if (!data) { return null; }

        const result = new PointsSummaryBase();
        result.day = DateTime.fromISOString(data.day);
        result.messagePoints = data.messagePoints;
        result.reactionPoints = data.reactionPoints;
        result.totalPoints = data.totalPoints;

        return result;
    }
}

export class PointsSummary extends PointsSummaryBase {
    public guild: Guild;
    public user: User;
    public mergeInfo: PointsMergeInfo | null;

    static create(data: any): PointsSummary | null {
        if (!data) { return null; }

        const summary = new PointsSummary();
        Object.assign(summary, super.create(data));
        summary.guild = Guild.create(data.guild);
        summary.user = User.create(data.user);
        summary.mergeInfo = data.mergeInfo ? PointsMergeInfo.create(data.mergeInfo) : null;

        return summary;
    }
}

export class GetPointTransactionsParams extends FilterBase {
    public merged: boolean = false;
    public guildId: string | null;
    public userId: string | null;
    public assignedAtFrom: string | null;
    public assignedAtTo: string | null;
    public onlyReactions: boolean;
    public onlyMessages: boolean;
    public messageId: string | null;

    static get empty(): GetPointTransactionsParams { return new GetPointTransactionsParams(); }

    get queryParams(): QueryParam[] {
        return [
            new QueryParam('merged', this.merged),
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.userId ? new QueryParam('userId', this.userId) : null,
            this.assignedAtFrom ? new QueryParam('assignedAt.from', this.assignedAtFrom) : null,
            this.assignedAtTo ? new QueryParam('assignedAt.to', this.assignedAtTo) : null,
            this.onlyReactions ? new QueryParam('onlyReactions', this.onlyReactions) : null,
            this.onlyMessages ? new QueryParam('onlyMessages', this.onlyMessages) : null,
            ...super.queryParams,
            this.messageId ? new QueryParam('messageId', this.messageId) : null
        ].filter(o => o);
    }

    static fromForm(form: any): GetPointTransactionsParams | null {
        if (!form) { return null; }

        const params = new GetPointTransactionsParams();
        params.guildId = form.guildId;
        params.userId = form.userId;
        params.assignedAtFrom = form.assignedAtFrom;
        params.assignedAtTo = form.assignedAtTo;
        params.onlyReactions = form.onlyReactions;
        params.onlyMessages = form.onlyMessages;
        params.messageId = form.messageId;

        return params;
    }
}

export class GetPointsSummaryParams extends FilterBase {
    public merged: boolean = false;
    public guildId: string | null;
    public userId: string | null;
    public daysFrom: string | null;
    public daysTo: string | null;

    static get empty(): GetPointsSummaryParams { return new GetPointsSummaryParams(); }

    get queryParams(): QueryParam[] {
        return [
            new QueryParam('merged', this.merged),
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.userId ? new QueryParam('userId', this.userId) : null,
            this.daysFrom ? new QueryParam('days.from', this.daysFrom) : null,
            this.daysTo ? new QueryParam('days.to', this.daysTo) : null,
            ...super.queryParams
        ].filter(o => o);
    }

    static fromForm(form: any): GetPointsSummaryParams | null {
        if (!form) { return null; }

        const params = new GetPointsSummaryParams();
        params.daysFrom = form.daysFrom;
        params.daysTo = form.daysTo;
        params.guildId = form.guildId;
        params.userId = form.userId;

        return params;
    }
}
