import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  public getCurrencyRateByDate(date: string) {
    return this.http.get('https://nationalbank.kz/rss/get_rates.cfm?fdate=' + date)
  }

}
