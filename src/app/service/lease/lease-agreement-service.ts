import { HttpClient } from "@angular/common/http";
import { getBaseUrl } from "../auth/base-url";
import { catchError, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LeaseAgreementService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient) { }

    public getLeaseAgreementList() {
        return this.http.get<any>(this.baseUrl + '/api/leaseagreement/GetAll')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public addLeaseAgreement() {
        return this.http.get<any>(this.baseUrl + '/api/leaseagreement/addleaseagreement')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public editLeaseAgreement() {
        return this.http.get<any>(this.baseUrl + '/api/leaseagreement/editleaseagreement')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
}