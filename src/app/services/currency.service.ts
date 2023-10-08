import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  fullUrl = environment.apiUrl + '/currency';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem(environment.apiToken),
  });

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this.http.get(this.fullUrl + '/getAll')
  }

  public getLatestValue(): Observable<any> {
    return this.http.get(this.fullUrl + '/getLatest')
  }


  public addValue(data: any): Observable<any> {
    return this.http.post(this.fullUrl + '/create', data, {
        headers: this.headers
      }
    )
  }

}
