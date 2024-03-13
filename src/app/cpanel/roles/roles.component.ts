import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  constructor(private AppService: AppService, private AuthService: AuthService) {
    this.AuthService.loginFalse();
    this.AppService.sidebar('roles-item');
  }
}
