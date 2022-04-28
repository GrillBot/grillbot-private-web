import { SystemService } from './../../../core/services/system.service';
import { DiagnosticsInfo } from './../../../core/models/system';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
    selector: 'app-diagnostics',
    templateUrl: './diagnostics.component.html'
})
export class DiagnosticsComponent implements OnInit {
    data: DiagnosticsInfo;

    constructor(
        private systemService: SystemService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.refreshDiag();
    }

    refreshDiag(): void {
        this.data = null;
        this.systemService.getDiagnostics().subscribe(diag => this.data = diag);
    }

    toggleState(isActive: boolean): void {
        this.systemService.setBotState(isActive).subscribe(_ => this.refreshDiag());
    }

    openStats(type: string): void {
        const modal = this.modalService.showCustomModal<StatisticsComponent>(StatisticsComponent, 'xxl');
        modal.componentInstance.type = type;
    }
}
