import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuestGuard } from '../../core/guards/guest.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
