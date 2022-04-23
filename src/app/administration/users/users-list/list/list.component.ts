import { DataListComponent } from './../../../../shared/data-list/data-list.component';
import { Component, ViewChild } from '@angular/core';
import { GetUserListParams } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/services/user.service';
import { PaginatedParams } from 'src/app/core/models/common';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sortDesc = false;
    private filter: GetUserListParams;

    constructor(
        private userService: UserService
    ) { }

    filterChanged(filter: GetUserListParams): void {
        this.filter = filter;
        if (this.list) { this.list.filterChanged(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, { descending: this.sortDesc });
        this.userService.getUsersList(this.filter).subscribe(list => this.list.setData(list));
    }

    toggleSort(): void {
        this.sortDesc = !this.sortDesc;
        this.list.filterChanged();
    }
}
