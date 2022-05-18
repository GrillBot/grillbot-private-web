import { Support } from './../../../../core/lib/support';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusColorMapping, UserStatus, UserStatusTexts } from 'src/app/core/models/enums/user-status';
import { UserDetail } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    data: UserDetail;

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    get statusColor(): string { return StatusColorMapping[Support.getEnumKeyByValue(UserStatus, this.data.status)] as string; }
    get statusText(): string { return UserStatusTexts[Support.getEnumKeyByValue(UserStatus, this.data.status)] as string; }

    ngOnInit(): void {
        this.reload();
    }

    reload(): void {
        this.data = null;

        const userId: string = this.activatedRoute.snapshot.params.id as string;
        this.userService.getUserDetail(userId).subscribe(detail => {
            if (detail.isPublicAdminOnline) {
                detail.activeClients.push('UserAdmin');
            }

            if (detail.isWebAdminOnline) {
                detail.activeClients.push('WebAdmin');
            }

            this.data = detail;
        });
    }
}
