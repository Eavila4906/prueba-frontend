import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CpanelComponent } from './cpanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { 
    path: 'principal', component: CpanelComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  {
    path: 'sistema', component: CpanelComponent,
    children: [
      { path: 'roles', component: RolesComponent },
      { path: 'usuarios', component: UsersComponent },
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ], 
  exports: [
    RouterModule
  ]
})
export class CpanelRoutingModule { }
