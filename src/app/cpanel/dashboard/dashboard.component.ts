import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { DashboardService } from 'src/app/services/cpanel/dashboard/dashboard.service';
import { UsersService } from 'src/app/services/cpanel/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData:any = localStorage.getItem('userData');
  idUser: number = 0;
  name:string = '';
  lastname:string = '';
  role:string | null = localStorage.getItem('rol');

  departure_date:string = '';
  start_date:string = '';
  attempts:number = 0;

  online:number = 0;
  locked:number = 0;
  offline:number = 0;
  failedAttempts:number = 0;


  constructor (
    private AppService: AppService, 
    private AuthService: AuthService, 
    private DashboardService: DashboardService,
    private UsersService: UsersService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('dashboard-item');
  }

  ngOnInit(): void {
    if (this.userData !== null) {
      let userdata = JSON.parse(this.userData);
      this.idUser = userdata.user.idUser;
      this.name = userdata.user.name;
      this.lastname = userdata.user.lastname;

      this.DashboardService.getSessionsByUser({idUser: this.idUser}).subscribe(
        response => {
          this.start_date = response.start_date;
          this.departure_date = response.departure_date === null ? '1' : response.departure_date;
          this.attempts = response.attempts;
        }
      );
    }

    this.UsersService.getUsers().subscribe(
      response => {
        for (let user of response) {
          if (user.status === '1') {
            this.online++;
          } else if (user.status === '0') {
            this.offline++;
          } else if (user.status === 'LOCKED') {
            this.locked++;
          }
          this.failedAttempts =+ user.failedAttempts;
        }

        this.failedAttempts = response.reduce((total:number, user:any) => total + user.failedAttempts, 0);
      }
    );
  }
}
