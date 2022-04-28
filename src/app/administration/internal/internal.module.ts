import { NgModule } from '@angular/core';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
    { path: '', redirectTo: 'diag' },
    { path: 'diag', component: DiagnosticsComponent }
];

@NgModule({
    declarations: [
        DiagnosticsComponent,
        StatisticsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class InternalModule { }
