import { Dictionary } from './../../../core/models/common';
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html'
})
export class DatabaseComponent implements OnInit {
    data: Dictionary<string, number>;

    constructor(
        private systemService: SystemService
    ) { }

    ngOnInit(): void {
        this.systemService.getDatabaseInfo().subscribe(data => this.data = data);
    }
}
