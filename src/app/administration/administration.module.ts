import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { AuthGuard } from '../core/services/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            {
                path: 'servers',
                loadChildren: () => import('./guilds/guilds.module').then(mod => mod.GuildsModule),
                data: { title: 'Servery', id: 'servers' }
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
                data: { title: 'Uživatelé', id: 'users' }
            },
            {
                path: 'audit-log',
                loadChildren: () => import('./audit-log/audit-log.module').then(mod => mod.AuditLogModule),
                data: { title: 'Audit log', id: 'audit-log' }
            },
            {
                path: 'channels',
                loadChildren: () => import('./channels/channels.module').then(mod => mod.ChannelsModule),
                data: { title: 'Kanály', id: 'channels' }
            },
            {
                path: 'invites',
                loadChildren: () => import('./invites/invites.module').then(mod => mod.InvitesModule),
                data: { title: 'Pozvánky', id: 'invites' }
            },
            {
                path: 'permissions',
                loadChildren: () => import('./permissions/permissions.module').then(mod => mod.PermissionsModule),
                data: { title: 'Oprávnění', id: 'permissions' }
            },
            {
                path: 'reminder',
                loadChildren: () => import('./reminders/reminders.module').then(mod => mod.RemindersModule),
                data: { title: 'Reminder', id: 'reminder' }
            },
            {
                path: 'search',
                loadChildren: () => import('./searching/searching.module').then(mod => mod.SearchingModule),
                data: { title: 'Hledání', id: 'searching' }
            },
            {
                path: 'internal',
                loadChildren: () => import('./internal/internal.module').then(mod => mod.InternalModule),
                data: { title: 'Interní', id: 'internal' }
            },
            {
                path: 'unverify',
                loadChildren: () => import('./unverify/unverify.module').then(mod => mod.UnverifyModule),
                data: { title: 'Unverify', id: 'unverify' }
            },
            {
                path: 'selfunverify',
                loadChildren: () => import('./selfunverify/selfunverify.module').then(mod => mod.SelfunverifyModule),
                data: { title: 'SelfUnverify', id: 'selfunverify' }
            },
            {
                path: 'auto-reply',
                loadChildren: () => import('./auto-reply/auto-reply.module').then(mod => mod.AutoReplyModule),
                data: { title: 'Automatické odpovědi', id: 'auto-reply' }
            },
            {
                path: 'emotes',
                loadChildren: () => import('./emotes/emotes.module').then(mod => mod.EmotesModule),
                data: { title: 'Správa emotů', id: 'emotes' }
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [
        AdministrationComponent,
        HeaderComponent,
        SidenavComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdministrationModule { }
