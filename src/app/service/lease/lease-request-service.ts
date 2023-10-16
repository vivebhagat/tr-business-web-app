import { HttpClient } from "@angular/common/http";
import { getBaseUrl } from "../auth/base-url";
import { catchError, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LeaseRequestService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient) { }

    public getLeaseRequestList() {
        return this.http.get<any>(this.baseUrl + '/api/leaserequest/GetAll')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public addLeaseRequest() {
        return this.http.get<any>(this.baseUrl + '/api/leaserequest/addleaserequest')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public editLeaseRequest() {
        return this.http.get<any>(this.baseUrl + '/api/leaserequest/editleaserequest')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
}