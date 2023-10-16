import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';;
import { getBaseUrl } from '../auth/base-url';
import { CreateBusinessUser } from 'src/app/model/user/create-businessuser';
import { UpdateBusinessUser } from 'src/app/model/user/update-businessuser';

@Injectable()
export class BusinessUserService {
    baseUrl: string = getBaseUrl();
    authKey = '_authorizationData';

    constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

    getBusinessUserRoles(userId: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUserStandard/GetBusinessUserRoles/?userId=' + userId)
    }

    register(user: CreateBusinessUser): Observable<any> {
        return new HttpClient(this.httpBackend).post<any>(this.baseUrl + '/api/BusinessUserDefault/AddBusinessUser', user)
    }
    
    getBusinessUserDetails(userId: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetBusinessUserByUserId/' + userId)
    }

    updateProfile(user: UpdateBusinessUser): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/BusinessUser/EditBusinessUser', user)
    }

    getDomainList(userId: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUserStandard/GetDomainKeysForUser/' + userId)
    }

    selectDomain(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUserStandard/SelectDomain/' + Id)
    }

    getBusinessUserList(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetAll')
    }

    getAllBusinessuserRoles(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetAllBusinessUserRoles/')
    }

    
    addBusinessuser(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/BusinessUser/AddBusinessUser/', data)
    }

    editBusinessuser(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/BusinessUser/EditBusinessUser/', data)
    }

    getBusinessuser(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetBusinessUserById/' + Id)
    }

    getBusinessuserRoles(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetAllBusinessUserRoles')
    }

    addBusinessUserRole(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetAllBusinessUserRoles')
    }
}