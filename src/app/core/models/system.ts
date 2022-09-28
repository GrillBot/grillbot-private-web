import { ConnectionState, ConnectionStateTexts } from './enums/connection-state';
import { DateTime } from './datetime';
import { Support } from '../lib/support';
import { Dictionary } from './common';

export class DiagnosticsInfo {
    public instanceType: string;
    public startAt: DateTime;
    public uptime: string;
    public cpuTime: string;
    public connectionState: ConnectionState;
    public usedMemory: number;
    public isActive: boolean;
    public currentDateTime: DateTime;
    public activeOperations: Dictionary<string, number>;

    get formattedConnectionState(): string {
        return ConnectionStateTexts[Support.getEnumKeyByValue(ConnectionState, this.connectionState)] as string;
    }

    static create(data: any): DiagnosticsInfo | null {
        if (!data) { return null; }
        const info = new DiagnosticsInfo();

        info.connectionState = data.connectionState;
        info.cpuTime = data.cpuTime;
        info.instanceType = data.instanceType;
        info.startAt = DateTime.fromISOString(data.startAt as string);
        info.uptime = data.uptime;
        info.usedMemory = data.usedMemory;
        info.isActive = data.isActive;
        info.currentDateTime = DateTime.fromISOString(data.currentDateTime as string);
        info.activeOperations = Object.keys(data.activeOperations).map(k => ({ key: k, value: parseInt(data.activeOperations[k], 10) }));

        return info;
    }
}
