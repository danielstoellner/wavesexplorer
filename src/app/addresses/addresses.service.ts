import { Injectable } from '@angular/core';
import {MessageService} from "../message.service";
import {SettingsService} from "../common/settings.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Peer} from "../peer/peer";
import {Observable} from "rxjs/Observable";
import {Address} from "./address";
import {of} from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AddressesService {

  private addressesUrl = 'addresses';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private settingService: SettingsService
  ) { }

  getAddresses(): Observable<Address[]> {
    this.log("call " + this.settingService.serverPath + this.addressesUrl);
    return this.http.get<Address[]>(this.settingService.serverPath + this.addressesUrl)
      .pipe(
        tap(addresses => this.log(`fetched addresses`)),
        catchError(this.handleError('getAddresses', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PeerService: ' + message);
  }
}
