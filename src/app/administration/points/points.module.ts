import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    { path: '', redirectTo: 'transactions' },
    {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(mod => mod.TransactionsModule)
    }
];

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class PointsModule { }
