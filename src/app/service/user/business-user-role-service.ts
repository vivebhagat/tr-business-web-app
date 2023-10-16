import { Injectable } from "@angular/core";
import { getBaseUrl } from "../auth/base-url";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class BusinessUserRoleService {
    baseUrl: string = getBaseUrl();
    authKey = '_authorizationData';

    constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

    getAllBusinessUserRoles(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUserRole/GetAllBusinessUserRoles')
    }

    getBusinessUserRoleById(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUserRole/GetBusinessUserRoleById/' + Id)
    }

    addBusinessUserRole(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/BusinessUserRole/AddBusinessUserRole', data)
    }

    editBusinessUserRole(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/BusinessUserRole/EditBusinessUserRole', data)
    }

    
    deleteBusinessUserRole(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUserRole/DeleteBusinessUserRole/' + Id)
    }
}
