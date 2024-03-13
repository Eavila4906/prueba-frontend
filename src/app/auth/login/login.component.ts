import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:string = '';
  password:string = '';

  constructor(
    private router:Router, 
    private LoginService: LoginService, 
    private AuthService: AuthService,
    private AppService: AppService,
    private toastr: ToastrService
  ) { 
    this.AuthService.loginTrue();
    //this.base_url = AppService.urlBase();
  }

  login() {
    let data = {
      user: this.user,
      password: this.password
    }
    console.log(data)
    this.LoginService.login(data).subscribe(
      response => {
        if (response) {
          let rolId = response.roles[0][0];
          let rol = response.roles[0][1];

          this.router.navigate(['/principal']);

          let userData = {
            user: {
              idUser: response.idUser,
              username: response.username,
              name: response.name,
              lastname: response.lastname
            }
          }

          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('rolId', rolId);
          localStorage.setItem('rol', rol);

          this.toastr.success(response.name + ' ' + response.lastname, '¡Bienvenido!', {closeButton: true});
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

}

