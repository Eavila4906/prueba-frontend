import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private AppService: AppService, private http: HttpClient) { }

  login(data: any) {
    const url = this.AppService.urlBase() + '/auth/login';
    return this.http.post<any>(url, data).pipe(
      catchError(error => {
        if (error.status === 400 || error.status === 404) {
          return throwError(error.error.message);
        } else {
          return throwError(error.status, error.error.message);
        }
      })
    );
  }

}
