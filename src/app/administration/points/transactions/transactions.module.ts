import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, data: { merged: false } },
    { path: 'merged', component: DashboardComponent, data: { merged: true } }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class TransactionsModule { }
