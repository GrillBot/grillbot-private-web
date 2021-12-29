import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutoReplyRoutingModule } from './auto-reply-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        CreateComponent
    ],
    imports: [
        SharedModule,
        AutoReplyRoutingModule
    ]
})
export class AutoReplyModule { }
