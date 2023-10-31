import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';;
import { getBaseUrl } from '../auth/base-url';
import { CreateCommunity } from 'src/app/model/estate/create-community';
import { UpdateCommunity } from 'src/app/model/estate/update-community';


@Injectable()
export class CommunityService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

    addCommunity(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Community/AddCommunity', data)
    }

    getCommunitybyId(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Community/GetCommunityById/' + Id)
    }

    getAllCommunities(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Community/GetAllCommunities')
    }

    getAllFeaturedCommunities(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Community/GetAllFeaturedCommunities')
    }

    editCommunity(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Community/EditCommunity', data)
    }

    deleteCommunity(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Community/DeleteCommunity/' + Id)
    }

    deleteCommunityToPropertyMap(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/CommunityToPropertyMap/DeleteCommunityToPropertyMap/' + Id)
    }
}