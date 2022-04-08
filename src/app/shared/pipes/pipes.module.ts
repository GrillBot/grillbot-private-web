import { DurationPipe } from './duration.pipe';
import { DiscordPermsPipePipe } from './discord-perms-pipe.pipe';
import { DateTimeFormatterPipe } from './date-time-formatter.pipe';
import { CzechBooleanPipePipe } from './czech-boolean-pipe.pipe';
import { BitmaskToStringPipe } from './bitmask-to-string.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        BitmaskToStringPipe,
        CzechBooleanPipePipe,
        DateTimeFormatterPipe,
        DiscordPermsPipePipe,
        DurationPipe
    ],
    exports: [
        BitmaskToStringPipe,
        CzechBooleanPipePipe,
        DateTimeFormatterPipe,
        DiscordPermsPipePipe,
        DurationPipe
    ]
})
export class PipesModule { }
