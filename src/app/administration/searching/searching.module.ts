import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchingRoutingModule } from './searching-routing.module';
import { SearchingDetailComponent } from './searching-detail/searching-detail.component';

@NgModule({
    declarations: [
        ListComponent,
        FilterComponent,
        DashboardComponent,
        SearchingDetailComponent
    ],
    imports: [
        SharedModule,
        SearchingRoutingModule
    ]
})
export class SearchingModule { }
