import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class errorHandlerInterceptor implements HttpInterceptor {

constructor(){}

intercept(request : HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{

return next.handle(request).pipe(
  catchError((err: HttpErrorResponse) => {
    console.log(err);

    return of()
  }))}}