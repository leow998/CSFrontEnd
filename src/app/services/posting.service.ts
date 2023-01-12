import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http: HttpClient) { }

  createItem(data: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/posting/item", data,)
      .pipe(
        tap((_) => this.log('Item placed successfully')),
        catchError(this.handleError<[]>('Error placing Item', []))
      );
  }

  getAllItems(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + "api/posting/allItems")
      .pipe(
        tap((_) => this.log('Item Showing successfully')),
        catchError(this.handleError<[]>('Error showing Item', []))
      );
  }

  updateItem(productId, data: any): Observable<any> {
    return this.http
      .put<[]>(BASIC_URL + `api/posting/update-item/${productId}`, data,)
      .pipe(
        tap((_) => this.log('Item Showing successfully')),
        catchError(this.handleError<[]>('Error showing Item', []))
      );
  }

  getItemById(productId): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/posting/show-item/${productId}`)
      .pipe(
        tap((_) => this.log('Item Showing successfully')),
        catchError(this.handleError<[]>('Error showing Item', []))
      );
  }



  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
