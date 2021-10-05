import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './users-list/dashboard/dashboard.component';
import { ListComponent } from './users-list/list/list.component';
import { FilterComponent } from './users-list/filter/filter.component';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';
import { UserDetailGuildsComponent } from './detail/user-detail-guilds/user-detail-guilds.component';
import { UserDetailEmotesComponent } from './detail/user-detail-emotes/user-detail-emotes.component';
import { UserDetailSettingsComponent } from './detail/user-detail-settings/user-detail-settings.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        UserDetailComponent,
        UserDetailGuildsComponent,
        UserDetailEmotesComponent,
        UserDetailSettingsComponent
    ],
    imports: [
        SharedModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }