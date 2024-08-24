import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { UserLoginResponse } from '../helper/client.interface';
import { SessaoService } from '../sessao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private sessaoService: SessaoService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const { email, senha } = this.loginForm.value;
    this.http
      .post<UserLoginResponse>(
        'http://localhost:5069/api/Login/login',
        { email, senha }
        // { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          if (response.role === 'user') {
            this.sessaoService.salvarSessao({
              email: response.email,
              accessToken: response.role,
            });
            this.router.navigate(['/main']);
          } else {
            this.dialog.open(ErrorModalComponent);
          }
        },
        (error) => {
          this.dialog.open(ErrorModalComponent);
        }
      );
  }
}
