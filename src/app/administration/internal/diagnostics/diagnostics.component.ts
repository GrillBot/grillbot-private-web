import { Component } from '@angular/core';
import { ModalService } from 'src/app/shared/modal';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
    selector: 'app-diagnostics',
    templateUrl: './diagnostics.component.html'
})
export class DiagnosticsComponent {
    constructor(
        private modalService: ModalService
    ) { }

    openStats(type: string): void {
        const modal = this.modalService.showCustomModal<StatisticsComponent>(StatisticsComponent, 'xxl');
        modal.componentInstance.type = type;
    }
}
