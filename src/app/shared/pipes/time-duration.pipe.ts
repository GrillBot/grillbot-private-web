import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeDuration' })
export class TimeDurationPipe implements PipeTransform {
    transform(value: number, ..._: any[]): string {
        if (value < 1000) {
            return `${value} ms`;
        }

        return new Date(value).toISOString().slice(11, 23);
    }
}
