import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './main/register/register.component';
import { LoginComponent } from './main/login/login.component';
import { AccountComponent } from './main/account/account.component';
import { MailActivationComponent } from './main/notification/mail-activation/mail-activation.component';
import { UserActivateComponent } from './main/notification/user-activate/user-activate.component';
import { UserDeleteComponent } from './main/notification/user-delete/user-delete.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'account-confirm',
    component: MailActivationComponent
  },
  {
    path: 'activateuser',
    component: UserActivateComponent
  },
  {
    path: 'account-delete',
    component: UserDeleteComponent
  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
