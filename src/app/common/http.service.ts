import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {
  user: string;

  constructor(
    private http: Http,
    private injector: Injector
  ) { }

  public get<T>(url: any, options?: any): Promise<T> {
    return <Promise<T>>this.http.get(url, options)
      .map(this.extractData)
      .catch((e, o) => this.catchError(e))
      .toPromise();
  }

  private extractData<T>(res: Response): T {
    try {
      const body = res.json();
      return body;
    } catch (e) {
      return <any>res.toString();
    }
  }

  private catchError(err: any): Observable<{}> {
    return Observable.throw(err);
  }
}
