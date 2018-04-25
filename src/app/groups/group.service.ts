import { Injectable } from '@angular/core';
import {MessageService} from "../message.service";
import {SettingsService} from "../common/settings.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {Group} from "./group";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GroupsService {
  private groupsUrl = 'groups';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private settingService: SettingsService,
  ) { }

  /** GET users from the server */
  getGroups (): Observable<Group[]> {
    return this.http.get<Group[]>(this.settingService.wavesBackendAPI + this.groupsUrl )
      .pipe(
        tap(groups => this.log(`fetched groups`)),
        catchError(this.handleError('getGroups', []))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = `${this.settingService.wavesBackendAPI + this.groupsUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => this.log(`fetched group id=${id}`)),
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getGroupPromise(id: number): Promise<Group> {
    const url = `${this.settingService.wavesBackendAPI + this.groupsUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => this.log(`fetched group id=${id}`)),
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    ).toPromise();
  }

  /** POST: add a new Group to the server */
  addGroup (group: Group): Observable<Group> {
    console.log('addGroup');
    console.log(this.settingService.wavesBackendAPI + this.groupsUrl);
    return this.http.post<Group>(this.settingService.wavesBackendAPI + this.groupsUrl, group, httpOptions).pipe(
      tap((group: Group) => this.log(`added group w/ id=${group.id}`)),
      catchError(this.handleError<Group>('addGroup'))
    );
  }

  /** PUT: update the user on the server */
  updateGroup (group: Group): Observable<any> {
    return this.http.put(this.settingService.wavesBackendAPI + this.groupsUrl + "/"+ group.id, group, httpOptions).pipe(
      tap(_ => this.log(`updated group id=${group.id}`)),
      catchError(this.handleError<any>('updateGroup'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteGroup (group: Group | number): Observable<Group> {
    const id = typeof group === 'number' ? group : group.id;
    const url = `${this.settingService.wavesBackendAPI + this.groupsUrl}/${id}`;

    return this.http.delete<Group>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted group id=${id}`)),
      catchError(this.handleError<Group>('deleteGroup'))
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
    this.messageService.add('UserService: ' + message);
  }
}
