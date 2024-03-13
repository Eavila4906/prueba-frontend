import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { CpanelComponent } from './cpanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    CpanelComponent,
    DashboardComponent,
    RolesComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ], 
  exports: [
    CpanelComponent,
    DashboardComponent,
    RolesComponent,
    UsersComponent
  ]
})
export class CpanelModule { }
