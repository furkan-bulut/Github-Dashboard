import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
 } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptor implements HttpInterceptor  {
  constructor () {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    console.log("auth interceptor calisti");
    request = request.clone(
      {
        headers: request.headers.set("Authorization", "Bearer" + "token")
      }
    )

    return next.handle(request);
  }
}
