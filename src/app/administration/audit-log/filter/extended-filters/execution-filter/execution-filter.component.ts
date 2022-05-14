import { ExecutionFilter } from './../../../../../core/models/audit-log';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-execution-filter',
    templateUrl: './execution-filter.component.html'
})
export class ExecutionFilterComponent implements OnInit {
    @Input() label: string;

    constructor() { }

    get result(): ExecutionFilter {
        return null;
    }

    ngOnInit(): void {
    }

}
