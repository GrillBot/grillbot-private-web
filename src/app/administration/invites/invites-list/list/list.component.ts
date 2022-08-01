import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { PaginatedResponse } from './../../../../core/models/common';
import { Component } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetInviteListParams } from 'src/app/core/models/invites';
import { InviteService } from 'src/app/core/services/invite.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetInviteListParams> {
    constructor(
        private inviteService: InviteService
    ) { super(); }

    configure(): void {
        this.sort.descending = true;
        this.sort.orderBy = 'CreatedAt';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.inviteService.getInviteList(this.filter);
    }
}
