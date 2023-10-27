import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';;
import { getBaseUrl } from '../auth/base-url';
import { CreateCommunityType } from 'src/app/model/estate/create-community-type';
import { UpdateCommunityType } from 'src/app/model/estate/update-community-type';

@Injectable()
export class CommunityTypeService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

    addCommunityType(data: CreateCommunityType): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/CommunityType/AddCommunityType', data)
    }

    getCommunityTypebyId(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/CommunityType/GetCommunityTypeById/' + Id)
    }

    getAllCommunityTypes(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/CommunityType/GetAllCommunityTypes')
    }

    editCommunityType(data: UpdateCommunityType): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/CommunityType/EditCommunityType', data)
    }

    deleteCommunityType(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/CommunityType/DeleteCommunityType/' + Id)
    }
}