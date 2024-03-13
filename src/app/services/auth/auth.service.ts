import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Router:Router, private AppService:AppService, private http:HttpClient) { }

  loginFalse() {
    let userData = localStorage.getItem('userData');
    if (userData === null) {
      this.Router.navigate(['/login']);
    }
  }

  loginTrue() {
    let userData = localStorage.getItem('userData');
    if (userData !== null) {
      let data = JSON.parse(userData);
      if (data.access_token) {
        this.Router.navigate(['/principal']);
      }
    }
  }

  logout(data:any) {
    const url = this.AppService.urlBase() + '/auth/logout';
    return this.http.post(url, data).pipe(
      catchError(error => {
        return throwError("Ha ocurrido un error, intentelo mas tarde.");
      })
    );
  }

}
