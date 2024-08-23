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

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormsComponent {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, this.cpfValidator]],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', [Validators.required, this.numericValidator]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      comp: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
    } else {
      this.clientForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir as mensagens de erro
    }
  }

  onCepInput() {
    const cep = this.clientForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.buscarEndereco();
    }
  }

  buscarEndereco() {
    const cep = this.clientForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((endereco: any) => {
          this.clientForm.patchValue({
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            uf: endereco.uf,
          });
        });
    }
  }

  numericValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const valid = /^[0-9]{8}$/.test(control.value);
    return valid ? null : { numeric: true };
  }

  cpfValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const valid = /^[0-9]{11}$/.test(control.value);
    return valid ? null : { numeric: true };
  }
}
