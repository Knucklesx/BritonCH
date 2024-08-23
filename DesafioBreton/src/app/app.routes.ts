import { Routes } from '@angular/router';

import { ClientFormsComponent } from './client-form/client-form.component';
import { LoginComponent } from './login/login.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'client-register', component: ClientFormsComponent },
  { path: 'user-register', component: UserFormComponent },
  { path: 'main', component: MainDashboardComponent },
];
