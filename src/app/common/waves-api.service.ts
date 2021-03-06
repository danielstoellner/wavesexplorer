import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {SettingsService} from "./settings.service";
import {Address} from "../addresses/address";
import {MessageService} from "../message.service";
import {Transaction} from "../blocks/transaction";
import {Group} from "../groups/group";
import {Asset} from "../asset/asset";
import {Block, BlockHeight} from "../blocks/block";
import {PeerModel} from "../peer/peer";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WavesApiService {

  private addressesUrl = 'addresses';
  private assetUrl = 'assets/details/';
  private blockUrl = 'blocks/';
  private peersUrl = 'peers/connected';
  private transactionUrl = 'transactions/info/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private settingService: SettingsService
  ) { }

  /**
   * Liefert die Addressen zurück
   *
   * @returns {Observable<Address[]>}
   */
  getAddresses(): Observable<Address[]> {
    this.log("call " + this.settingService.serverPath + this.addressesUrl);
    return this.http.get<Address[]>(this.settingService.serverPath + this.addressesUrl)
      .pipe(
        tap(addresses => this.log(`fetched addresses`)),
        catchError(this.handleError('getAddresses', []))
      );
  }

  /**
   * Liefert die Addressen zurück
   *
   * @returns {Promise<Address[]>}
   */
  getAddressesPromise(): Promise<Address[]> {
    this.log("call " + this.settingService.serverPath + this.addressesUrl);
    return this.http.get<Address[]>(this.settingService.serverPath + this.addressesUrl)
      .pipe(
        tap(addresses => this.log(`fetched addresses`)),
        catchError(this.handleError('getAddresses', []))
      ).toPromise();
  }

  /** GET hero by id. Will 404 if id not found */
  /**
   * Liefert die Bilanzen eines Blockes zurück
   * @param {string} address
   * @returns {Observable<Address>}
   */
  getBalance(address: string): Observable<Address> {
    const url = `${this.settingService.serverPath + this.addressesUrl }/balance/details/${address}`;
    this.log("call " + url);
    return this.http.get<Address>(url).pipe(
      tap(_ => this.log(`fetched balance=${address}`)),
      catchError(this.handleError<Address>('getAddresses'))
    );
  }

  /**
   * Liefert die Bilanzen eines Blockes zurück
   * @param {string} address
   * @returns {Promise<Address>}
   */
  getBalancePromise(address: string): Promise<Address> {
    const url = `${this.settingService.serverPath + this.addressesUrl }/balance/details/${address}`;
    this.log("call " + url);
    return this.http.get<Address>(url).pipe(
      tap(_ => this.log(`fetched balance=${address}`)),
      catchError(this.handleError<Address>('getAddresses'))
    ).toPromise();
  }

  /** GET hero by id. Will 404 if id not found */
  /**
   * Liefert die Transaktionenen in einem Block zurück
   * @param {string} address
   * @param {number} count
   * @returns {Observable<Transaction[]>}
   */
  getTransactions(address: string, count: number): Observable<Transaction[]> {
    this.log("call " + address + count);
    const url = `${this.settingService.serverPath}transactions/address/${address}/limit/${count}`;
    this.log("call " + url);
    return this.http.get<Transaction[]>(url).pipe(
      tap(_ => this.log(`fetched transactions=${address}`)),
      catchError(this.handleError<Transaction[]>('getAddressTransactions'))
    );
  }


  /*
  ASSETS
   */

  /*
   *Liefert den Betrag zu einer Transaktion
   * Assets
   * @param {string} assetId
   * @returns {Observable<Asset>}
   */
  getAssetById(assetId: string): Observable<Asset> {
    const url = `${this.settingService.serverPath + this.assetUrl }${assetId}`;
    return this.http.get<Asset>(url).pipe(
      tap(_ => this.log(`fetched asset=${assetId}`)),
      catchError(this.handleError<Asset>('getAssetId'))
    );
  }

  /*
  BLOCK
   */

  /**
   * Liefert die aktuelle Höhe der gesamten Blockchain zurück
   *
   * @returns {Promise<BlockHeight>}
   */
  getHeight (): Promise<BlockHeight> {
    this.log("call " + this.settingService.serverPath + this.blockUrl + 'height');
    return this.http.get<BlockHeight>(this.settingService.serverPath + this.blockUrl + 'height')
      .pipe(
        tap(_ => this.log(`fetched height`)),
        catchError(this.handleError<Block>(`getHeight`))
      )
      .toPromise();
  }

  /**
   * Liefert den letzten Block zurück
   * @param {number} height
   * @returns {Promise<Block>}
   */
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

  /**
   * Liefert die Blocksignatur zurück
   * @param {string} signature
   * @returns {Observable<Block>}
   */
  getBlockSignature(signature: string): Observable<Block> {
    const url = `${this.settingService.serverPath + this.blockUrl }signature/${signature}`;
    return this.http.get<Block>(url).pipe(
      tap(_ => this.log(`fetched block signature=${signature}`)),
      catchError(this.handleError<Block>(`getBlock signature=${signature}`))
    );
  }

  /**
   * Liefert die ID von den Blöcken, die an der Transaktion beteiligt sind
   * @param {number} from
   * @param {number} to
   * @returns {Promise<Block[]>}
   */
  getBlockFromTo(from: number, to: number): Promise<Block[]> {
    const url = `${this.settingService.serverPath + this.blockUrl }seq/${from}/${to}`;
    return this.http.get<Block[]>(url)
      .pipe(
        tap(_ => this.log(`fetched blocks from=${from} to ${to}`)),
        catchError(this.handleError<Block[]>(`getBlocks ${from} to ${to}`)))
      .toPromise();
  }

  /**
   * Liefert die ID von den Blöcken, die an der Transaktion beteiligt sind
   * @param {number} from
   * @param {number} to
   * @returns {Observable<Block[]>}
   */
  getBlockFromTo2 (from: number, to: number): Observable<Block[]> {
    const url = `${this.settingService.serverPath + this.blockUrl }seq/${from}/${to}`;
    return this.http.get<Block[]>(url)
      .pipe(
        tap(_ => this.log(`fetched blocks from=${from} to ${to}`)),
        catchError(this.handleError<Block[]>(`getBlocks ${from} to ${to}`))
      );
  }

  /**
   * Liefert die Höhe eines Blockes
   * @returns {Observable<BlockHeight[]>}
   */
  getBlockHeight(): Observable<BlockHeight[]> {
    this.log("call " + this.settingService.serverPath + this.blockUrl + 'height');

    return this.http.get<BlockHeight[]>(this.settingService.serverPath + this.blockUrl + 'height')
      .pipe(
        tap(height => this.log(`fetched blockheight`)),
        catchError(this.handleError('getBlockheight', []))
      );
  }

  /** GET blocks whose id contains search term
   * @param {string} term
   * @returns {Observable<Block[]>}
   */
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

  /*
  PEERS
   */
  /** GET peers from the server
   * @returns {Observable<PeerModel[]>}
   */
  getPeers (): Observable<PeerModel[]> {
    return this.http.get<PeerModel[]>(this.settingService.serverPath + this.peersUrl )
      .pipe(
        tap(peers => this.log(`fetched peers`)),
        catchError(this.handleError('getPeers', []))
      );
  }

  /*
  TRANSACTIONS
   */
  /**
   * Liefert Transaktionen zurück
   * @param {string} transactionId
   * @returns {Observable<Transaction>}
   */
  getTransaction(transactionId: string): Observable<Transaction> {
    const url = `${this.settingService.serverPath + this.transactionUrl }${transactionId}`;
    return this.http.get<Transaction>(url).pipe(
      tap(_ => this.log(`fetched transaction=${transactionId}`)),
      catchError(this.handleError<Transaction>('getTransactionId'))
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
    this.messageService.add('AddressService: ' + message);
  }
}
