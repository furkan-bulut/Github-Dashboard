import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseApi : string = "https://jsonplaceholder.typicode.com/";

  constructor(
    private _http : HttpClient
  ) { }

  SetApi(api:string, differentEndpoint: boolean)
  {
    if (differentEndpoint)
      return api;
    else 
      return this.baseApi + api;
  }

  post<T>(api:string, model:any,callBack: (res: HttpEvent<T>) => void, differentEndpoint:boolean = false, options : any = {} ) 
  {
    let apiUrl = this.SetApi(api, differentEndpoint);

    this._http.post<T>(apiUrl, model, options).subscribe({next : (res)=> callBack(res)})
  }
  
  put<T>(api:string, model:any,callBack: (res: HttpEvent<T>) => void, differentEndpoint:boolean = false, options : any = {} ) 
  {
    let apiUrl = this.SetApi(api, differentEndpoint);

    this._http.put<T>(apiUrl, model, options).subscribe({next : (res)=> callBack(res)})
  }

  delete<T>(api:string,callBack: (res: HttpEvent<T>) => void, differentEndpoint:boolean = false, options : any = {} ) 
  {
    let apiUrl = this.SetApi(api, differentEndpoint);

    this._http.delete<T>(apiUrl, options).subscribe({next : (res)=> callBack(res)})
  }

  get<T>(api:string,callBack: (res: HttpEvent<T>) => void, differentEndpoint:boolean = false, options : any = {} ) 
  {
    let apiUrl = this.SetApi(api, differentEndpoint);

    this._http.get<T>(apiUrl, options).subscribe({next : (res)=> callBack(res)})
  }

}
