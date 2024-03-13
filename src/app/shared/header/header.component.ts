import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: any = localStorage.getItem('userData');
  idUser:number = 0;
  username:string = '';
  role:string | null = '';

  constructor(
    private router:Router,
    private AppService: AppService,
    private AuthService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.userData !== null) {
      let userdata = JSON.parse(this.userData);
      this.idUser = userdata.user.idUser;
      this.username = userdata.user.username;
      this.role = localStorage.getItem('rol') !== null ? localStorage.getItem('rol') : null;
    }
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: '<strong>¿Desea cerrar la sesión?</strong>',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.AuthService.logout({idUser: this.idUser}).subscribe(
          response => {
            if (response) {
              this.toastr.success('', '¡Hasta pronto!', { closeButton: true });
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          },
          error => {
            this.toastr.error(error.message, '¡Error!', { closeButton: true });
          }
        );
      }
    });
  }
}
