import { NgModule } from '@angular/core';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { CommandsComponent } from './commands/commands.component';
import { DatabaseComponent } from './database/database.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditLogStatsComponent } from './audit-log-stats/audit-log-stats.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'diag' },
    { path: 'diag', component: DiagnosticsComponent },
    { path: 'commands/text', component: CommandsComponent, data: { interactions: false } },
    { path: 'commands/interactions', component: CommandsComponent, data: { interactions: true } }
];

@NgModule({
    declarations: [
        DiagnosticsComponent,
        CommandsComponent,
        DatabaseComponent,
        AuditLogStatsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class InternalModule { }
