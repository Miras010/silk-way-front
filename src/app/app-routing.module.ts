import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserGuard} from "./guards/user.guard";
import {LogoutComponent} from "./logout/logout.component";
import {AdminGuard} from "./guards/admin.guard";
import {PartnerGuard} from "./guards/partner.guard";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: 'partner',
    loadChildren: () => import('./partner/partner.module')
      .then(m => m.PartnerModule),
    canActivate: [PartnerGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'user'
  },
];
=======

const routes: Routes = [];
>>>>>>> 99d5555 (initial commit)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
