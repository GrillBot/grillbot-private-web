import { ActivatedRoute } from '@angular/router';
import { INavigation, NavigationItem } from './../../shared/navigation/navigation';

export class InviteNavigation implements INavigation {
    constructor(private currentRoute: ActivatedRoute) { }

    getItems(): NavigationItem[] {
        return [
            new NavigationItem('/admin/invites', 'Seznam pozvánek'),
            new NavigationItem('/admin/invites/service', 'Servisní operace')
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
