import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { getBaseUrl } from '../auth/base-url';
import { getCustomerUrl } from '../auth/customer-url';

@Injectable()
export class GlobalService {

    baseUrl: string = getBaseUrl();
    customerBaseUrl: string = getCustomerUrl();
    
    constructor(private http: HttpClient, ) { }

    public getPropertyList() {
        return this.http.get<any>( this.baseUrl + '/api/property/GetAllProperties' );
    }

    public getCustomerList() {
        return this.http.get<any>( this.customerBaseUrl + '/api/Customer/GetAll' );
    }
}