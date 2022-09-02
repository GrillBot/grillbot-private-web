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
    public lastOccurence: RangeParams<string>;
    public filterAnimated: boolean = false;
    public emoteName: string;
    public firstOccurence: RangeParams<string>;

    static get empty(): EmotesListParams { return new EmotesListParams(); }

    static create(form: any): EmotesListParams {
        if (!form) { return null; }
        console.log(form);

        const params = new EmotesListParams();

        params.guildId = form.guildId;
        params.filterAnimated = form.filterAnimated ?? false;
        params.emoteName = form.emoteName;
        params.useCount = {
            from: form.useCountFrom,
            to: form.useCountTo
        };
        if (!params.useCount.from && !params.useCount.to) { params.useCount = null; }
        params.firstOccurence = {
            from: form.firstOccurenceFrom,
            to: form.firstOccurenceTo
        };
        if (!params.firstOccurence.from && params.firstOccurence.to) { params.firstOccurence = null; }
        params.lastOccurence = {
            from: form.lastOccurenceFrom,
            to: form.lastOccurenceTo
        };
        if (!params.lastOccurence.from && !params.lastOccurence.to) { params.lastOccurence = null; }
        return params;
    }

    public serialize(): any {
        return {
            guildId: this.guildId,
            useCountFrom: this.useCount?.from,
            useCountTo: this.useCount?.to,
            firstOccurenceFrom: this.firstOccurence?.from,
            firstOccurenceTo: this.firstOccurence?.to,
            lastOccurenceFrom: this.lastOccurence?.from,
            lastOccurenceTo: this.lastOccurence?.to,
            emoteName: this.emoteName,
            filterAnimated: this.filterAnimated
        }
    }
}

export class MergeEmoteStatsParams {
    constructor(
        public sourceEmoteId: string,
        public destinationEmoteId: string
    ) { }
}
