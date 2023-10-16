import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authServcice: AuthService) {}

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const authToken = this.authServcice.getAuthData()!.AccessToken;
    const domainKey = this.authServcice.getAuthData()!.DomainKey;
    console.log(domainKey)
    const modifiedRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${authToken}`, DomainKey: domainKey.toString() },
    });

    return next.handle(modifiedRequest);
  }
}
