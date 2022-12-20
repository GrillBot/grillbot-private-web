import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({ name: 'timeDuration' })
export class TimeDurationPipe implements PipeTransform {
    transform(value: number, ..._: any[]): string {
        if (value < 1000) {
            return `${value} ms`;
        }

        const moment = Moment.duration({ milliseconds: value });
        const days = moment.days();
        const hours = String(moment.hours()).padStart(2, '0');
        const minutes = String(moment.minutes()).padStart(2, '0');
        const seconds = String(moment.seconds()).padStart(2, '0');
        const miliseconds = String(moment.milliseconds()).padStart(3, '0');

        return (days > 0 ? `${days}.` : '') + `${hours}:${minutes}:${seconds}.${miliseconds}`;
    }
}
