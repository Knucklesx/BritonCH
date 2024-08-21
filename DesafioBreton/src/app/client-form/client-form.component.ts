import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})
export class ClientFormsComponent {
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
