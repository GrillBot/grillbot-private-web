import { UserStatus, UserStatusTexts } from 'src/app/core/models/enums/user-status';
import { ConnectionState, ConnectionStateTexts } from './enums/connection-state';
import { DateTime } from './datetime';
import { Support } from '../lib/support';

export class DiagnosticsInfo {
    public instanceType: string;
    public startAt: DateTime;
    public uptime: string;
    public cpuTime: string;
    public latency: string;
    public connectionState: ConnectionState;
    public usedMemory: number;
    public userStatus: UserStatus;

    get formattedConnectionState(): string {
        return ConnectionStateTexts[Support.getEnumKeyByValue(ConnectionState, this.connectionState)];
    }

    get botStatus(): string {
        return UserStatusTexts[Support.getEnumKeyByValue(UserStatus, this.userStatus)];
    }

    static create(data: any): DiagnosticsInfo | null {
        if (!data) { return null; }
        const info = new DiagnosticsInfo();

        info.connectionState = data.connectionState;
        info.cpuTime = data.cpuTime;
        info.instanceType = data.instanceType;
        info.latency = data.latency;
        info.startAt = DateTime.fromISOString(data.startAt);
        info.uptime = data.uptime;
        info.usedMemory = data.usedMemory;
        info.userStatus = data.userStatus;

        return info;
    }
}

export class CommandStatisticItem {
    public command: string;
    public lastCall: DateTime;
    public successCount: number;
    public failedCount: number;
    public successRate: number;

    static create(data: any): CommandStatisticItem | null {
        if (!data) { return null; }
        const item = new CommandStatisticItem();

        item.command = data.command;
        item.failedCount = data.failedCount;
        item.lastCall = DateTime.fromISOString(data.lastCall);
        item.successCount = data.successCount;
        item.successRate = data.successRate;

        return item;
    }
}