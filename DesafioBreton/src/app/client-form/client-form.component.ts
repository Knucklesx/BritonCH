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
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormsComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private modalService: ModalService
  ) {
    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, this.cpfValidator]],
      data_de_Nascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', [Validators.required, this.numericValidator]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = {
        ...this.clientForm.value,
        estado: this.clientForm.get('uf')?.value,
        data_de_Nascimento: new Date(
          this.clientForm.get('data_de_Nascimento')?.value
        ),
      };
      console.log(clientData);
      this.http.post('http://localhost:5069/api/Client', clientData).subscribe({
        next: (data) => {
          this.modalService.openSuccessModal('Cliente cadastrado com Sucesso!');
        },
        error: (error) => {
          // console.error('Erro ao cadastrar cliente', error);
          this.modalService.openErrorModal('CPF informado já cadastrado');
        },
      });
    } else {
      this.clientForm.markAllAsTouched();
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
