import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserLoginResponse } from '../helper/client.interface';
import { ModalService } from '../helper/modal.service';
import { SessaoService } from '../sessao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private sessaoService: SessaoService,
    private modalService: ModalService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const { email, senha } = this.loginForm.value;
    this.http
      .post<UserLoginResponse>('http://localhost:5069/api/Login/login', {
        email,
        senha,
      })
      .subscribe(
        (response) => {
          if (response.role === 'user') {
            this.sessaoService.salvarSessao({
              email: response.email,
              accessToken: response.role,
            });
            this.router.navigate(['/main']);
          } else {
            this.modalService.openErrorModal('Erro ao logar');
          }
        },
        (error) => {
          this.modalService.openErrorModal('E-mail ou Senha incorreto');
        }
      );
  }
}
