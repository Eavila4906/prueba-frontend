import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppService } from '../../app.service';
import { RolesService } from '../roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private AppService: AppService, private http: HttpClient, private RolesServices: RolesService) { }

  getSessionsByUser(data:any) {
    const url = this.AppService.urlBase() + '/auth/sessions_details';
    return this.http.post<any>(url, data);
  }
}
