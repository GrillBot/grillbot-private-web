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
    public useCountFrom: number | null;
    public useCountTo: number | null;
    public firstOccurenceFrom: string | null;
    public firstOccurenceTo: string | null;
    public lastOccurenceFrom: string | null;
    public lastOccurenceTo: string | null;
    public filterAnimated: boolean = false;
    public emoteName: string;

    static get empty(): EmotesListParams { return new EmotesListParams(); }

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.useCountFrom != null ? new QueryParam('useCount.from', this.useCountFrom) : null,
            this.useCountTo != null ? new QueryParam('useCount.to', this.useCountTo) : null,
            this.firstOccurenceFrom != null ? new QueryParam('firstOccurence.from', this.firstOccurenceFrom) : null,
            this.firstOccurenceTo != null ? new QueryParam('firstOccurence.to', this.firstOccurenceTo) : null,
            this.lastOccurenceFrom != null ? new QueryParam('lastOccurence.from', this.lastOccurenceFrom) : null,
            this.lastOccurenceTo != null ? new QueryParam('lastOccurence.to', this.lastOccurenceTo) : null,
            ...super.queryParams,
            new QueryParam('filterAnimated', this.filterAnimated),
            this.emoteName ? new QueryParam('emoteName', this.emoteName) : null
        ].filter(o => o);
    }

    static create(form: any): EmotesListParams {
        if (!form) { return null; }

        const params = new EmotesListParams();

        params.guildId = form.guildId;
        params.filterAnimated = form.filterAnimated ?? false;
        params.emoteName = form.emoteName;
        params.useCountFrom = form.useCountFrom;
        params.useCountTo = form.useCountTo;
        params.firstOccurenceFrom = form.firstOccurenceFrom;
        params.firstOccurenceTo = form.firstOccurenceTo;
        params.lastOccurenceFrom = form.lastOccurenceFrom;
        params.lastOccurenceTo = form.lastOccurenceTo;
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
