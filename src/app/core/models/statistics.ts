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

        return item;
    }
}
