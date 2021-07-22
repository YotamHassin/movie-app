

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { HttpHeaders, HttpParams } from '@angular/common/http'

import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

function getErrorMessage(error: any): string {
  let errMsg: string = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

  //console.error(errMsg); // log to console instead
  return errMsg;
}

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  constructor() { }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable errored result
*/
  protected handleError<T>(operation = 'operation') {
    return (error: any, result?: Observable<T>): Observable<T> => {

      let errMsg: string = getErrorMessage(error);

      // TODO: send the error to remote logging infrastructure
      console.error(`error http ${operation} failed: ${errMsg}`, error); // log to console instead

      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return result;
    };
  }

  /** Log a HeroService message with the MessageService */
  log(operation: string, ...optionalParams: any[]) {
    console.log('log http ' + operation, ...optionalParams);
  }



}

// of 15 overload
export type OptionsType = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean; responseType?: "json";
  observe?: "body"; withCredentials?: boolean;
};


export interface Action<T> {
  (obj: T): void;
}

@Injectable({
  providedIn: 'root'
})
export class MyHttpClient extends HttpBaseService {
  constructor(public http: HttpClient) { super(); }
  public baseUrl: string = ''

  private pipeHandle<T>(observable: Observable<T>, operation) {
    observable.pipe(
      //tap(_ => console.log('fetched Contacts', _)),
      catchError(this.handleError<T>(operation))
    );

    observable.subscribe(x => {
      this.log(operation + ' returned', x);
      //if (action) { action(x); }
    });
  }

  getUrl(reletiveUrl: string): string {
    let url: string;
    if (this.baseUrl && this.baseUrl != '') {
      url = this.baseUrl + '/' + reletiveUrl;
    }
    else {
      url = reletiveUrl;
    }
    return url;
  }

  get<T>(reletiveUrl: string, operation?: string, options?: OptionsType): Observable<T> {
    let url: string = this.getUrl(reletiveUrl);
    //console.log('', {reletiveUrl, url});
    
    let observable: Observable<T> = this.http.get<T>(url, options);
    observable.subscribe(x=> console.log('HttpClient observable', x));

    this.pipeHandle(observable, operation);

    return observable;
  }

  getSingle<T>(reletiveUrl: string, idToGet: string, operation?: string, options?: OptionsType): Observable<T> {
    let url: string = this.getUrl(reletiveUrl);
    return this.get<T>(url + '/' + idToGet, operation, options);
  }

  post<T>(reletiveUrl: string, body: any, operation?: string, options?: OptionsType): Observable<T> {
    let url: string = this.getUrl(reletiveUrl);
    let observable: Observable<T> = this.http.post<T>(url, body, options);
    this.pipeHandle(observable, operation);

    return observable;
  }

  delete<T>(reletiveUrl: string, idToRemove: string, operation?: string, options?: OptionsType): Observable<T> {
    let url: string = this.getUrl(reletiveUrl);
    let observable: Observable<T> = this.http.delete<T>(url + '?id=' + idToRemove, options);

    this.pipeHandle(observable, operation);

    return observable;
  }

  put<T>(reletiveUrl: string, idToUpdate: string, body: any, operation?: string, options?: OptionsType): Observable<T> {
    let url: string = this.getUrl(reletiveUrl);
    let observable: Observable<T> = this.http.put<T>(url + '/' + idToUpdate, options);

    this.pipeHandle(observable, operation);

    return observable;
  }


}

