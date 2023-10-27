import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';;
import { getBaseUrl } from '../auth/base-url';
import { CreateConstructionStatus } from 'src/app/model/estate/create-construction-status';
import { UpdateConstructionStatus } from 'src/app/model/estate/update-construction-status';

@Injectable()
export class ConstructionStatusService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

    addConstructionStatus(data: CreateConstructionStatus): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/ConstructionStatus/AddConstructionStatus', data)
    }

    getConstructionStatusbyId(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/ConstructionStatus/GetConstructionStatusById/' + Id)
    }

    getAllConstructionStatus(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/ConstructionStatus/GetAllConstructionStatuss')
    }

    editConstructionStatus(data: UpdateConstructionStatus): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/ConstructionStatus/EditConstructionStatus', data)
    }

    deleteConstructionStatus(Id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/ConstructionStatus/DeleteConstructionStatus/' + Id)
    }
}