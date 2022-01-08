import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'create', component: CreateComponent }
];

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        CreateComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PermissionsModule { }
