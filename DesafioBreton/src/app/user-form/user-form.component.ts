import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nome: [''],
      email: [''],
      senha: [''],
    });
  }
  onSubmit() {
    console.log(this.userForm.value);
  }
}
