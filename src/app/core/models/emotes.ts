import { FilterBase, PaginatedParams, RangeParams, SortParams } from "./common";
import { DateTime } from "./datetime";
import { QueryParam } from "./http";

export class EmoteItem {
    public id: string;
    public name: string;
    public imageUrl: string;
    public fullId: string;

    static create(data: any): EmoteItem | null {
        if (!data) { return null; }

        const item = new EmoteItem();
        item.id = data.id;
        item.imageUrl = data.imageUrl;
        item.name = data.name;
        item.fullId = data.fullId;

        return item;
    }
}

export class EmoteStatItem {
    public emote: EmoteItem;
    public useCount: number;
    public firstOccurence: DateTime;
    public lastOccurence: DateTime;
    public usedUsersCount: number;

    static create(data: any): EmoteStatItem | null {
        if (!data) { return null; }
        const item = new EmoteStatItem();

        item.emote = EmoteItem.create(data.emote);
        item.useCount = data.useCount;
        item.firstOccurence = DateTime.fromISOString(data.firstOccurence);
        item.lastOccurence = DateTime.fromISOString(data.lastOccurence);
        item.usedUsersCount = data.usedUsersCount;

        return item;
    }
}

export class EmotesListParams extends FilterBase {
    public guildId: string;
    public useCount: RangeParams<number>;
    public firstOccurence: RangeParams<DateTime>;
    public lastOccurence: RangeParams<DateTime>;
    public filterAnimated: boolean;

    static get empty(): EmotesListParams {
        const params = new EmotesListParams();

        params.firstOccurence = {};
        params.lastOccurence = {};
        params.useCount = {};
        params.filterAnimated = false;

        return params;
    }

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.useCount.from != null ? new QueryParam('useCount.from', this.useCount.from) : null,
            this.useCount.to != null ? new QueryParam('useCount.to', this.useCount.to) : null,
            this.firstOccurence.from != null ? new QueryParam('firstOccurence.from', this.firstOccurence.from) : null,
            this.firstOccurence.to != null ? new QueryParam('firstOccurence.to', this.firstOccurence.to) : null,
            this.lastOccurence.from != null ? new QueryParam('lastOccurence.from', this.lastOccurence.from) : null,
            this.lastOccurence.to != null ? new QueryParam('lastOccurence.to', this.lastOccurence.to) : null,
            ...super.queryParams,
            new QueryParam('filterAnimated', this.filterAnimated)
        ].filter(o => o);
    }

    static deserialize(data: EmotesListParams): EmotesListParams {
        if (!data) { return null; }

        const params = new EmotesListParams();

        params.guildId = data.guildId;
        params.filterAnimated = data.filterAnimated;
        params.useCount = {
            from: data.useCount.from,
            to: data.useCount.to
        };
        params.firstOccurence = {
            from: data.firstOccurence.from,
            to: data.firstOccurence.to
        };

        params.lastOccurence = {
            from: data.lastOccurence.from,
            to: data.lastOccurence.to
        };

        return params;
    }

    static create(form: any): EmotesListParams {
        if (!form) { return null; }

        const params = new EmotesListParams();

        params.guildId = form.guildId;
        params.filterAnimated = form.filterAnimated ?? false;

        params.useCount = {
            from: form.useCountFrom,
            to: form.useCountTo
        };

        params.firstOccurence = {
            from: form.firstOccurenceFrom,
            to: form.firstOccurenceTo
        };

        params.lastOccurence = {
            from: form.lastOccurenceFrom,
            to: form.lastOccurenceTo
        };

        return params;
    }
}

export class MergeEmoteStatsParams {
    constructor(
        public sourceEmoteId: string,
        public destinationEmoteId: string
    ) { }
}

export type SortingTypes = 'EmoteId' | 'UseCount' | 'FirstOccurence' | 'LastOccurence';
