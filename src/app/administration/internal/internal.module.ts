import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { CommandsComponent } from './commands/commands.component';
import { DatabaseComponent } from './database/database.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditLogStatsComponent } from './audit-log-stats/audit-log-stats.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
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
