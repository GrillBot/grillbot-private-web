import { Dictionary } from 'src/app/core/models/common';
import { DateTime } from "./datetime";

export class StatisticItem {
    public key: string;
    public last: DateTime;
    public successCount: number;
    public failedCount: number;
    public successRate: number;
    public minDuration: number;
    public maxDuration: number;
    public totalDuration: number;
    public avgDuration: number;
    public lastRunDuration: number;

    static create(data: any): StatisticItem | null {
        if (!data) { return null; }
        const item = new StatisticItem();

        item.key = data.key;
        item.failedCount = data.failedCount;
        item.last = DateTime.fromISOString(data.last);
        item.successCount = data.successCount;
        item.successRate = data.successRate;
        item.minDuration = data.minDuration;
        item.maxDuration = data.maxDuration;
        item.totalDuration = data.totalDuration;
        item.avgDuration = data.avgDuration;
        item.lastRunDuration = data.lastRunDuration;

        return item;
    }
}

export class DatabaseStatistics {
    public database: Dictionary<string, number>;
    public cache: Dictionary<string, number>;

    static create(data: any): DatabaseStatistics | null {
        if (!data) { return null; }
        const stats = new DatabaseStatistics();

        stats.database = Object.keys(data.database).map(k => ({ key: k, value: data.database[k] as number }));
        stats.cache = Object.keys(data.cache).map(k => ({ key: k, value: data.cache[k] as number }));

        return stats;
    }
}
