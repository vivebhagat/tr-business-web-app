import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginData } from 'src/app/model/auth/login';
import { Observable, catchError, map } from 'rxjs';
import { getBaseUrl } from './base-url';
import { AuthData } from 'src/app/model/auth/authData';
import { Role } from 'src/app/model/auth/role';

@Injectable({ providedIn: 'root' })
export class AuthService {
    baseUrl: string = getBaseUrl();
    authKey = '_businessauthdata';

    constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

    register(user: any) {
        return this.http.post<any>(this.baseUrl, user);
    }

    login(user: LoginData): Observable<any> {
        const body = new HttpParams()
            .set('username', user.UserName)
            .set('password', user.Password);

        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return new HttpClient(this.httpBackend).post<any>(this.baseUrl + '/api/BusinessUserDefault/login', body.toString(), { headers }).pipe(
            map((response: any) => {
                let authData = new AuthData();
                authData.AccessToken = response.result.AccessToken,
                authData.RefreshToken = response.result.RefreshToken,
                authData.DataRoute = response.result.DataRoute,
                authData.ExpireAt = response.result.ExpireAt,
                authData.UserId = response.result.UserId
                authData.UserName = response.result.UserName
                localStorage.setItem(this.authKey, JSON.stringify(authData));
                return response;
            }),
            catchError(err => {
                throw err;
            })
        );
    }


    roleSelect(role: string, refreshToken: string): Observable<any> {
        const params = new HttpParams()
            .set('role', role)
            .set('refreshToken', refreshToken);

        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post<any>(this.baseUrl + '/api/BusinessUserStandard/RoleSelect', params.toString(), { headers }).pipe(
            map((response: any) => {
                this.setAuth(response);
                return response;
            }),
            catchError(err => {
                console.error(err);
                throw err;
            })
        );
    }

    editOrganization(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Organization/EditOrganization/', data)
    }

    getAllOrganizations(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Organization/GetAllOrganizations')
    }

    logout(userId: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/Logout/' + userId)
    }

    getAuthData(): AuthData | null {
        const data = localStorage.getItem(this.authKey);
        return data ? JSON.parse(data) : null;
    }

    setAuth(data: any) {
        var authDatastring = localStorage.getItem(this.authKey);
        let authData: AuthData = JSON.parse(authDatastring!);
        authData.AccessToken = data.result.AccessToken,
        authData.RefreshToken = data.result.RefreshToken,
        authData.DataRoute = data.result.DataRoute,
        authData.ExpireAt = data.result.ExpireAt,
        authData.UserId = data.result.UserId,
        authData.UserName = data.result.UserName,
        authData.Role = data.result.Role,
        authData.RoleName = data.result.RoleName,
        localStorage.setItem(this.authKey, JSON.stringify(authData));
    }

    clearAuth() {
        localStorage.removeItem(this.authKey);
    }
}