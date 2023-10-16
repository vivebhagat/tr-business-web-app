import { HttpClient } from "@angular/common/http";
import { getBaseUrl } from "../auth/base-url";
import { catchError, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ContractRequestService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient) { }

    public getContractRequestList() {
        return this.http.get<any>(this.baseUrl + '/api/ContractRequest/GetAll')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public addContractRequest(data: any) {
        return this.http.post<any>(this.baseUrl + '/api/ContractRequest/AddContractRequest', data)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public editContractRequest(data: any) {
        return this.http.post<any>(this.baseUrl + '/api/ContractRequest/EditContractRequest', data)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public getContractRequest(Id: number) {
        return this.http.get<any>(this.baseUrl + '/api/ContractRequest/GetContractRequestById/' + Id)
    }

    public deleteContractRequest(Id: number) {
        return this.http.get<any>(this.baseUrl + '/api/ContractRequest/DeleteContractRequest/' + Id)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
        
    public getContractRequestStatusList() {
        return this.http.get<any>(this.baseUrl + '/api/ContractRequest/GetContractRequestStatus')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
    
}