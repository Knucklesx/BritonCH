import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      nome: [''],
      cpf: [''],
      dataNascimento: [''],
      telefone: [''],
      cep: [''],
      end1: [''],
      end2: [''],
      comp: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });
  }

  onSubmit() {
    console.log(this.clientForm.value);
  }
}
