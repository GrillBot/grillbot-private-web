import { FilterBase, RangeParams } from './common';
import { DateTime } from './datetime';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class PointsTransaction {
    public guild: Guild;
    public user: User;
    public messageId: string;
    public isReaction: boolean;
    public assignedAt: DateTime;
    public points: number;

    static create(data: any): PointsTransaction | null {
        if (!data) { return null; }

        const transaction = new PointsTransaction();
        transaction.assignedAt = DateTime.fromISOString(data.assignedAt);
        transaction.guild = Guild.create(data.guild);
        transaction.isReaction = data.isReaction;
        transaction.messageId = data.messageId;
        transaction.points = data.points;
        transaction.user = User.create(data.user);

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

    static create(data: any): PointsSummary | null {
        if (!data) { return null; }

        const summary = new PointsSummary();
        Object.assign(summary, super.create(data));
        summary.guild = Guild.create(data.guild);
        summary.user = User.create(data.user);

        return summary;
    }
}

export class GetPointTransactionsParams extends FilterBase {
    public guildId: string | null;
    public userId: string | null;
    public assingnedAtFrom: string | null;
    public assingnedAtTo: string | null;
    public onlyReactions: boolean;
    public onlyMessages: boolean;

    static get empty(): GetPointTransactionsParams { return new GetPointTransactionsParams(); }

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.userId ? new QueryParam('userId', this.userId) : null,
            this.assingnedAtFrom ? new QueryParam('assignedAt.from', this.assingnedAtFrom) : null,
            this.assingnedAtTo ? new QueryParam('assignedAt.to', this.assingnedAtTo) : null,
            this.onlyReactions ? new QueryParam('onlyReactions', this.onlyReactions) : null,
            this.onlyMessages ? new QueryParam('onlyMessages', this.onlyMessages) : null,
            ...super.queryParams
        ].filter(o => o);
    }

    static fromForm(form: any): GetPointTransactionsParams | null {
        if (!form) { return null; }

        const params = new GetPointTransactionsParams();
        params.guildId = form.guildId;
        params.userId = form.guildId;
        params.assingnedAtFrom = form.assignedAtFrom;
        params.assingnedAtTo = form.assingnedAtTo;
        params.onlyReactions = form.onlyReactions;
        params.onlyMessages = form.onlyMessages;

        return params;
    }
}

export class GetPointsSummaryParams extends FilterBase {
    public guildId: string | null;
    public userId: string | null;
    public daysFrom: string | null;
    public daysTo: string | null;

    static get empty(): GetPointsSummaryParams { return new GetPointsSummaryParams(); }

    get queryParams(): QueryParam[] {
        return [
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

export type TransactionSortType = 'AssignedAt' | 'User' | 'Points';
export type SummarySortType = 'Day' | 'MessagePoints' | 'ReactionPoints';
