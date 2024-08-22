import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

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
    public dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    // const { email, senha } = this.loginForm.value;
    const ll = this.loginForm.value;
    this.http
      // .post('http://localhost:3000/users', { email, senha })
      .get('http://localhost:3000/users', ll)
      .subscribe((response: any) => {
        if (response.success) {
          this.router.navigate(['/main']);
        } else {
          this.dialog.open(ErrorModalComponent);
        }
      });
  }
}
