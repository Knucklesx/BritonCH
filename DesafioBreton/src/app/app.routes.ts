import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientFormsComponent } from './client-form/client-form.component';
import { LoginComponent } from './login/login.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'client-register',
    component: ClientFormsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-register',
    component: UserFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'main', component: MainDashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-client/:id',
    component: ClientEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
