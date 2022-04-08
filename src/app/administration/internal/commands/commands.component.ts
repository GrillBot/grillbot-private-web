import { InternalNavigation } from './../navigation';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from './../../../shared/navigation/navigation';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { CommandStatisticItem } from 'src/app/core/models/system';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html'
})
export class CommandsComponent implements OnInit {
    navigation: INavigation;
    data: CommandStatisticItem[];
    form: FormGroup;
    interactions: boolean;

    constructor(
        private systemService: SystemService,
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.navigation = new InternalNavigation(route);
    }

    ngOnInit(): void {
        this.interactions = (this.route.snapshot.routeConfig.data.interactions as boolean) ?? false;

        this.form = this.fb.group({
            searchQuery: []
        });

        this.reload();
        this.form.valueChanges
            .pipe(
                debounceTime(500),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                filter(o => !o.searchQuery || o.searchQuery.length >= 3)
            ).subscribe(_ => {
                this.data = null;
                this.reload();
            });
    }

    reload(): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const searchQuery = this.form.value.searchQuery as string;

        if (this.interactions) {
            this.systemService.getInteractionsStatus(searchQuery).subscribe(data => this.data = data);
        } else {
            this.systemService.getCommandsStatistics(searchQuery).subscribe(data => this.data = data);
        }
    }
}
