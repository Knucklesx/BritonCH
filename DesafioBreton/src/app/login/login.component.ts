import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
