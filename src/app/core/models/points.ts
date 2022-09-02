import { createRangeParams, FilterBase, RangeParams } from './common';
import { DateTime } from './datetime';
import { Guild } from './guilds';
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
    public assignedAt: RangeParams<string> | null;
    public onlyReactions: boolean;
    public onlyMessages: boolean;
    public messageId: string | null;

    static get empty(): GetPointTransactionsParams { return new GetPointTransactionsParams(); }

    static fromForm(form: any): GetPointTransactionsParams | null {
        if (!form) { return null; }

        const params = new GetPointTransactionsParams();
        params.guildId = form.guildId;
        params.userId = form.userId;
        params.assignedAt = createRangeParams(form.assignedAtFrom, form.assignedAtTo);
        params.onlyReactions = form.onlyReactions ?? false;
        params.onlyMessages = form.onlyMessages ?? false;
        params.messageId = form.messageId;

        return params;
    }

    public serialize(): any {
        return {
            guildId: this.guildId,
            userId: this.userId,
            assignedAtFrom: this.assignedAt?.from,
            assignedAtTo: this.assignedAt?.to,
            onlyReactions: this.onlyReactions,
            onlyMessages: this.onlyMessages,
            messageId: this.messageId
        };
    }
}

export class GetPointsSummaryParams extends FilterBase {
    public merged: boolean = false;
    public guildId: string | null;
    public userId: string | null;
    public days: RangeParams<string> | null;

    static get empty(): GetPointsSummaryParams { return new GetPointsSummaryParams(); }

    static fromForm(form: any): GetPointsSummaryParams | null {
        if (!form) { return null; }

        const params = new GetPointsSummaryParams();
        params.days = createRangeParams(form.daysFrom, form.daysTo);
        params.guildId = form.guildId;
        params.userId = form.userId;

        return params;
    }

    public serialize(): any {
        return {
            guildId: this.guildId,
            userId: this.userId,
            daysFrom: this.days?.from,
            daysTo: this.days?.to
        };
    }
}
