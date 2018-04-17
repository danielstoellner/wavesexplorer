import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Asset} from "./asset";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SettingsService} from "../common/settings.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {MessageService} from "../message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

class Assets {
}

@Injectable()
export class AssetService {

  private assetUrl = 'assets/details/';

  constructor(
    private http: HttpClient,
    private settingService: SettingsService,
    private messageService: MessageService,
  ) { }

  /** GET hero by id. Will 404 if id not found */
  getAssetById(assetId: string): Observable<Asset> {
    const url = `${this.settingService.serverPath + this.assetUrl }${assetId}`;
    return this.http.get<Asset>(url).pipe(
      tap(_ => this.log(`fetched asset=${assetId}`)),
      catchError(this.handleError<Asset>('getAssetId'))
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
    this.messageService.add('AssetService: ' + message);
  }
}
