import { ExplicitPermission } from './../../../core/models/permissions';
import { Component } from '@angular/core';
import { GetExplicitPermissionListParams } from 'src/app/core/models/permissions';
import { PermissionService } from 'src/app/core/services/permission.service';
import { ExplicitPermissionState } from 'src/app/core/models/enums/explicit-permission-state';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    data: ExplicitPermission[];

    private filter: GetExplicitPermissionListParams;

    constructor(
        private permissionService: PermissionService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetExplicitPermissionListParams): void {
        this.filter = filter;
        this.reloadData();
    }

    reloadData(): void {
        this.permissionService.getExplicitPermissionList(this.filter).subscribe(data => this.data = data);
    }

    toggleState(item: ExplicitPermission, allowed: boolean): void {
        const newState = allowed ? ExplicitPermissionState.Allowed : ExplicitPermissionState.Banned;

        this.permissionService.setPermissionState(item.command, item.targetId, newState).subscribe(_ => {
            this.reloadData();
        });
    }

    removeItem(item: ExplicitPermission): void {
        let message = `Opravdu si přeješ smazat oprávnění na příkaz "${item.command}" pro `;
        if (item.isRole) { message += `roli ${item.role.name}`; }
        else { message += `uživatele ${item.user.fullUsername}`; }
        message += '? Tato akce je nevratná!';

        this.modalService.showQuestion('Smazat oprávnění', message).onAccept.subscribe(_ => {
            this.permissionService.removeExplicitPermission(item.command, item.targetId).subscribe(__ => {
                this.reloadData();
            });
        });
    }
}
