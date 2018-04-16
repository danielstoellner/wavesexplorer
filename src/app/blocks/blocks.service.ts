import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "../message.service";
import {SettingsService} from "../common/settings.service";
import {HttpClient } from "@angular/common/http";
import {Block, BlockHeight } from "./block";
import {of} from "rxjs/observable/of";
import {User} from "../users/user";

@Injectable()
export class BlocksService {
  text: number;

  private blockUrl = 'blocks/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private settingService: SettingsService
  ) { }

  getHeight (): Promise<BlockHeight> {
    this.log("call " + this.settingService.serverPath + this.blockUrl + 'height');
    return this.http.get<BlockHeight>(this.settingService.serverPath + this.blockUrl + 'height')
      .pipe(
        tap(_ => this.log(`fetched height`)),
        catchError(this.handleError<Block>(`getHeight`))
      )
      .toPromise();
  }

  getLatestBlock(height: number): Promise<Block> {
    const url = `${this.settingService.serverPath + this.blockUrl }at/` + height;
    this.log(url);
    return this.http.get<Block>(url)
      .pipe(
        tap(_ => this.log(`fetched block height=${height}`)),
        catchError(this.handleError<Block>(`getBlock height=${height}`))
      )
      .toPromise();
  }

  /** GET Block by height. Will 404 if id not found */
  getBlockAt(height: number): Observable<Block> {
    const url = `${this.settingService.serverPath + this.blockUrl }at/${height}`;
    return this.http.get<Block>(url).pipe(
      tap(_ => this.log(`fetched block height=${height}`)),
      catchError(this.handleError<Block>(`getBlock height=${height}`))
    );
  }
  getBlockAt2(height: number): Promise<Block> {
    const url = `${this.settingService.serverPath + this.blockUrl }at/${height}`;
    return this.http.get<Block>(url).pipe(
      tap(_ => this.log(`fetched block height=${height}`)),
      catchError(this.handleError<Block>(`getBlock height=${height}`)))
      .toPromise();
  }

  getBlockFromTo(from: number, to: number): Promise<Block[]> {
    const url = `${this.settingService.serverPath + this.blockUrl }seq/${from}/${to}`;
    return this.http.get<Block[]>(url)
      .pipe(
        tap(_ => this.log(`fetched blocks from=${from} to ${to}`)),
        catchError(this.handleError<Block[]>(`getBlocks ${from} to ${to}`)))
      .toPromise();
  }

  getBlockFromTo2 (from: number, to: number): Observable<Block[]> {
    const url = `${this.settingService.serverPath + this.blockUrl }seq/${from}/${to}`;
    return this.http.get<Block[]>(url)
      .pipe(
        tap(_ => this.log(`fetched blocks from=${from} to ${to}`)),
        catchError(this.handleError<Block[]>(`getBlocks ${from} to ${to}`))
      );
  }

  getBlockHeight(): Observable<BlockHeight[]> {
    this.log("call " + this.settingService.serverPath + this.blockUrl + 'height');

    return this.http.get<BlockHeight[]>(this.settingService.serverPath + this.blockUrl + 'height')
      .pipe(
        tap(height => this.log(`fetched blockheight`)),
        catchError(this.handleError('getBlockheight', []))
      );
  }

  /* GET blcoks whose id contains search term */
  searchBlocks(term: string): Observable<Block[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Block[]>(this.settingService.serverPath + this.blockUrl +`seq/${term}/4`).pipe(
      tap(_ => this.log(`found blocks matching "${term}"`)),
      catchError(this.handleError<Block[]>('searchBlocks', []))
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
    this.messageService.add('BlockService: ' + message);
  }
}
