import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalService } from '../helper/modal.service';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private modalService: ModalService
  ) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', [Validators.required, this.senhaValidator]],
    });
  }
  onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      const user = {
        ...this.userForm.value,
        role: 'user',
      };
      this.http.post('http://localhost:5069/api/User', user).subscribe({
        next: (data) => {
          this.modalService.openSuccessModal('Usuário cadastrado com Sucesso!');
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  emailValidator(controle: AbstractControl) {
    const email = controle.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { emailInvalido: true };
    }
    return null;
  }

  senhaValidator(controle: AbstractControl) {
    const senha = controle.value;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!senhaRegex.test(senha)) {
      return { senhaInvalida: true };
    }
    return null;
  }
}
