import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { RouterModule, Routes } from '@angular/router';
import { ExtendedFiltersModalComponent } from './filter/extended-filters/extended-filters-modal/extended-filters-modal.component';
import { TextFilterComponent } from './filter/extended-filters/text-filter/text-filter.component';
import { ExecutionFilterComponent } from './filter/extended-filters/execution-filter/execution-filter.component';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        DetailModalComponent,
        ExtendedFiltersModalComponent,
        TextFilterComponent,
        ExecutionFilterComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AuditLogModule { }
