import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'common-dashboard',
    templateUrl: './common-dashboard.component.html'
})
export class CommonDashboardComponent {
    @Input() ignoreFilter = false;
}
