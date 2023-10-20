import { HttpClient } from "@angular/common/http";
import { getBaseUrl } from "../auth/base-url";
import { Observable, catchError, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PropertyService {
    baseUrl: string = getBaseUrl();

    constructor(private http: HttpClient) { }

    public getPropertyList(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/property/GetAllProperties')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public getFeaturedPropertyList(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/property/GetAllFeaturedProperties')
    }

    public getPropertyManagerList(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/BusinessUser/GetAll')
    }

    public addProperty(data: any) {
        return this.http.post<any>(this.baseUrl + '/api/property/AddProperty', data)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public editProperty(data: any) {
        return this.http.post<any>(this.baseUrl + '/api/property/EditProperty', data)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public getProperty(Id: number) {
        return this.http.get<any>(this.baseUrl + '/api/property/GetPropertyById/' + Id)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public deleteProperty(Id: number) {
        return this.http.get<any>(this.baseUrl + '/api/property/DeleteProperty/' + Id)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
    
    public getPropertyTypeList() {
        return this.http.get<any>(this.baseUrl + '/api/property/GetPropertyType')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
        
    public getPropertyStatusList() {
        return this.http.get<any>(this.baseUrl + '/api/property/GetPropertyStatus')
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

           
    public uploadPropertyImage(data: any) {
        return this.http.post<any>(this.baseUrl + '/api/propertyImage/AddPropertyImage', data)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    public getPropertyImageList(Id: number) {
        return this.http.get<any>(this.baseUrl + '/api/propertyImage/GetPropertyImageList/' + Id)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }

    
    public deleteImageFile(Id: number) {
        return this.http.get<any>(this.baseUrl + '/api/propertyImage/DeletePropertyImage/' + Id)
            .pipe(map(response => {
                return response;
            }, catchError(err => {
                return err;
            })))
    }
}