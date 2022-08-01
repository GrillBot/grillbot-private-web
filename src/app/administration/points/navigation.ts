import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/core/lib/navigation';
import { INavigation, NavigationItem } from 'src/app/shared/navigation/navigation';

export class PointsNavigation implements INavigation {
    constructor(private currentRoute: ActivatedRoute) { }

    getItems(): NavigationItem[] {
        return [
            new NavigationItem('/admin/points/transactions', 'Transakce'),
            new NavigationItem('/admin/points/summary', 'Denní souhrny')
        ];
    }

    isActive(item: NavigationItem): boolean {
        const currentPath = NavigationHelper.buildPath(this.currentRoute);
        return currentPath === item.routerLink;
    }
}
