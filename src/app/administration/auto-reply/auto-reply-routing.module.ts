import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'create', component: CreateComponent, data: { isAdd: true } },
    { path: ':id', component: CreateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutoReplyRoutingModule { }
