import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CpanelRoutingModule } from './cpanel/cpanel-routing.module';

import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    CpanelRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }