import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  fullUrl = environment.apiUrl + '/delivery';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem(environment.apiToken),
  });

  constructor(private http: HttpClient) {
  }

  public createRequest (data: any): Observable<any> {
    return this.http.post(this.fullUrl + '/create', data, {
      headers: this.headers
    })
  }

  public getUsersRequest (): Observable<any> {
    return this.http.get(this.fullUrl + '/getUsersRequests', {
      headers: this.headers
    })
  }

  public updateRequest (data: any): Observable<any> {
    return this.http.put(this.fullUrl + '/update', data, {
      headers: this.headers
    })
  }
}
