import { QueryParam } from './../models/http';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { AuthToken, OAuth2Link } from '../models/auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private storage: StorageService,
        private router: Router,
        private base: BaseService,
        private userService: UserService
    ) { }

    get currentToken(): AuthToken {
        return AuthToken.create(this.storage.read<any>('AuthData'));
    }

    get isLogged(): boolean {
        const token = this.currentToken;
        if (!token) { return false; }
        return !token.isExpired;
    }

    logout(): void {
        if (this.isLogged) {
            this.userService.hearthbeatOff().subscribe();
            this.storage.remove('AuthData');
        }

        this.router.navigateByUrl('/login');
    }

    getLink(): Observable<OAuth2Link> {
        const url = `${environment.apiUrl}/auth/link?isPublic=false`;

        return this.base.http.get<any>(url).pipe(
            map(data => OAuth2Link.create(data))
        );
    }

    processLogin(sessionId: string, isPublic: boolean): Observable<AuthToken> {
        const parameters = [
            new QueryParam('sessionId', sessionId),
            new QueryParam('isPublic', isPublic)
        ];

        const query = parameters.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/auth/token?${query}`;

        return this.base.http.get<any>(url).pipe(
            map(data => AuthToken.create(data)),
        );
    }
}
