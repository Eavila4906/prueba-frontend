import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppService } from '../../app.service';
import { RolesService } from '../roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private AppService: AppService, private http: HttpClient, private RolesServices: RolesService) { }

  getUsers() {
    const url = this.AppService.urlBase() + '/users';
    return this.http.get<any>(url);
  }

  getUser(id: number) {
    const url = this.AppService.urlBase() + `/user/${id}`;
    return this.http.get<any>(url);
  }

  editedUser(id:number, data: any) {
    const url = this.AppService.urlBase() + `/user/edit/${id}`;
    return this.http.put<any>(url, data).pipe(
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
