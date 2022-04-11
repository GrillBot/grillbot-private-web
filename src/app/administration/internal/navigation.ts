import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/core/lib/navigation';
import { INavigation, NavigationItem } from 'src/app/shared/navigation/navigation';

export class InternalNavigation implements INavigation {
    constructor(private currentRoute: ActivatedRoute) { }

    getItems(): NavigationItem[] {
        return [
            new NavigationItem('/admin/internal/diag', 'Diagnostika'),
            new NavigationItem('/admin/internal/commands/text', 'Statistika textových příkazů'),
            new NavigationItem('/admin/internal/commands/interactions', 'Statistika interaktivních příkazů')
        ];
    }

    isActive(item: NavigationItem): boolean {
        const currentPath = NavigationHelper.buildPath(this.currentRoute);
        return currentPath === item.routerLink;
    }
}
