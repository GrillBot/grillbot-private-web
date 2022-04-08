import { ActivatedRoute } from '@angular/router';
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
        const currentPath = this.buildCurrentPath();
        return currentPath === item.routerLink;
    }

    private buildCurrentPath(): string {
        const parts = this.currentRoute.snapshot.pathFromRoot
            .filter(o => o.routeConfig?.path && o.routeConfig.path.length > 0)
            .map(o => o.routeConfig.path);

        return `/${parts.join('/')}`;
    }
}
