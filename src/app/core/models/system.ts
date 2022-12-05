import { ConnectionState, ConnectionStateTexts } from './enums/connection-state';
import { DateTime } from './datetime';
import { Support } from '../lib/support';
import { Dictionary, List } from './common';

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

export class CounterStats {
    public section: string;
    public totalTime: number;
    public count: number;
    public averageTime: number;

    static create(data: any): CounterStats | null {
        if (!data) { return null; }
        const stats = new CounterStats();

        stats.section = data.section;
        stats.totalTime = data.totalTime;
        stats.count = data.count;
        stats.averageTime = data.averageTime;

        return stats;
    }
}

export class DashboardApiCall {
    public endpoint: string;
    public duration: number;
    public statusCode: string;

    static create(data: any): DashboardApiCall | null {
        if (!data) { return null; }
        const result = new DashboardApiCall();

        result.duration = data.duration;
        result.endpoint = data.endpoint;
        result.statusCode = data.statusCode;

        return result;
    }
}

export class DashboardJob {
    public name: string;
    public duration: number;
    public success: boolean;
    public startAt: DateTime;

    static create(data: any): DashboardJob | null {
        if (!data) { return null; }
        const job = new DashboardJob();

        job.duration = data.duration;
        job.success = data.success;
        job.startAt = DateTime.fromISOString(data.startAt);
        job.name = data.name;

        return job;
    }
}

export class DashboardCommand {
    public commandName: string;
    public duration: number;
    public startAt: DateTime;
    public success: boolean;
    public user: string;

    static create(data: any): DashboardCommand | null {
        if (!data) { return null; }
        const command = new DashboardCommand();

        command.commandName = data.commandName;
        command.duration = data.duration;
        command.startAt = DateTime.fromISOString(data.startAt);
        command.success = data.success;
        command.user = data.user;

        return command;
    }
}

export class Dashboard {
    public isDevelopment: boolean;
    public startAt: DateTime;
    public uptime: number;
    public cpuTime: number;
    public connectionState: ConnectionState;
    public usedMemory: number;
    public isActive: boolean;
    public currentDateTime: DateTime;

    public activeOperations: Dictionary<string, number>;
    public operationStats: List<CounterStats>;
    public todayAvgTimes: Dictionary<string, number>;
    public internalApiRequests: List<DashboardApiCall>;
    public publicApiRequests: List<DashboardApiCall>;
    public jobs: List<DashboardJob>;
    public commands: List<DashboardCommand>;

    static create(data: any): Dashboard | null {
        if (!data) { return null; }
        const dashboard = new Dashboard();

        dashboard.isDevelopment = data.isDevelopment;
        dashboard.startAt = DateTime.fromISOString(data.startAt);
        dashboard.uptime = data.uptime;
        dashboard.cpuTime = data.cpuTime;
        dashboard.connectionState = data.connectionState;
        dashboard.usedMemory = data.usedMemory;
        dashboard.isActive = data.isActive;
        dashboard.currentDateTime = DateTime.fromISOString(data.currentDateTime);
        dashboard.activeOperations = Object.keys(data.activeOperations).map(k => ({ key: k, value: parseInt(data.activeOperations[k], 10) }));
        dashboard.operationStats = data.operationStats.map((o: any) => CounterStats.create(o));
        dashboard.todayAvgTimes = data.todayAvgTimes ? Object.keys(data.todayAvgTimes).map(k => ({ key: k, value: parseInt(data.todayAvgTimes[k], 10) })) : null;
        dashboard.internalApiRequests = data.internalApiRequests ? data.internalApiRequests.map((o: any) => DashboardApiCall.create(o)) : null;
        dashboard.publicApiRequests = data.publicApiRequests ? data.publicApiRequests.map((o: any) => DashboardApiCall.create(o)) : null;
        dashboard.jobs = data.jobs ? data.jobs.map((o: any) => DashboardJob.create(o)) : null;
        dashboard.commands = data.commands ? data.commands.map((o: any) => DashboardCommand.create(o)) : null;

        return dashboard;
    }
}
