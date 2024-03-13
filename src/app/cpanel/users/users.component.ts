import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AppService } from 'src/app/services/app.service';
import { UsersService } from 'src/app/services/cpanel/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('ModalBulkLoad') ModalBulkLoad?: ModalDirective;
  @ViewChild('ModalEditedUser') ModalEditedUser?: ModalDirective;

  users:any[] = [];
  idUser:number = 0;
  name:string = '';
  lastname:string = '';
  mail:string = '';
  status:string = '1';


  //Bulk Load of users
  data: string[][] = [];
  showTable: boolean = false;

  constructor(
    private AppService: AppService, private AuthService: AuthService,
    private UsersService: UsersService, private toastr: ToastrService
  ) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('users-item');
  }

  ngOnInit(): void {
    this.UsersService.getUsers().subscribe(
      response => {
        this.users = response.map((item: any) => {

          if (item.status == 1) {
            item.r_status = 'Activo';
          } else if (item.status == 0) {
            item.r_status = 'Inactivo';
          } else if (item.status == 'LOCKED') {
            item.r_status = 'Bloqueado';
          }

          return item;
        });
      },
      error => {
        console.error('Error al obtener datos de la API:', error);
      }
    );
  }

  openModalBulkLoad() {
    this.ModalBulkLoad?.show();
  }

  openModalEditUser(id:number) {
    this.UsersService.getUser(id).subscribe(
      response => {
        this.idUser = response.idUser;
        this.name = response.name;
        this.lastname = response.lastname;
        this.mail = response.mail;
        this.status = response.status;
      }
    );
    this.ModalEditedUser?.show();
  }

  editedUser(id:number) {
    let data = {
      idUser: this.idUser,
      name: this.name,
      lastname: this.lastname,
      mail: this.mail,
      status: this.status
    }

    this.UsersService.editedUser(id, data).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.message, '¡Listo!', {closeButton: true});
          this.ngOnInit();
          this.ModalEditedUser?.hide();
        }
      },
      error => {
        this.toastr.warning(error, '¡Atención!', {closeButton: true});
      }
    );
  }

  onFileSelected(event: any) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const contenido = e.target.result;
      const lineas = contenido.split('\n');

      this.data = [];
      for (const linea of lineas) {
        const campos = linea.split(',');
        this.data.push(campos);
      }

      // Show the table after loading the file
      this.showTable = true;
    };

    reader.readAsText(archivo);
  }


}
