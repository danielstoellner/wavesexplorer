import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SettingsService} from "../common/settings.service";
import {MessageService} from "../message.service";
import {Observable} from "rxjs/Observable";
import {Peer, PeerModel} from "./peer";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

class Peers {
}

@Injectable()
export class PeerService {

  private peersUrl = 'peers/all';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private settingService: SettingsService
  ) { }

  getPeers (): Promise<PeerModel> {
    this.log("call " + this.settingService.serverPath + this.peersUrl);
    return this.http.get<PeerModel>(this.settingService.serverPath + this.peersUrl).toPromise();
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
