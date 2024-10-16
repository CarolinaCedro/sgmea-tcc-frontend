import {Injectable} from '@angular/core';
import {HttpService} from "../../utis/http/services/http.service";
import {map, take} from "rxjs/operators";
import {LocalStorageService} from "../../utis/localstorage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DasboardService {

  public TOKEN: string = "token";
  private apiUrl = '/api/sgmea/v1/dashboard';

  constructor(private http: HttpService, private localStorage: LocalStorageService) {
  }

  getDashboardData() {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .url(this.apiUrl)
      .get()
      .pipe(
        take(1),
        map((result) => result)
      );

  }
}
