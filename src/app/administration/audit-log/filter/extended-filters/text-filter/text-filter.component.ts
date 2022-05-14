import { TextFilter } from './../../../../../core/models/audit-log';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html'
})
export class TextFilterComponent implements OnInit {
    @Input() label: string;

    constructor() { }

    get result(): TextFilter {
        return null;
    }

    ngOnInit(): void {
    }

}
