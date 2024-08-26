import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from '../delete-modal/delete-modal.component';
import { ClientFull } from '../helper/client.interface';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css',
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup;
  clientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (clientId !== null) {
      this.clientId = Number(clientId);
      this.fetchClientData(this.clientId);
    }
  }

  onSubmit() {
    if (this.clientForm.valid && this.clientId !== null) {
      const clientData = {
        ...this.clientForm.value,
        id: this.clientId,
        nome: this.clientForm.get('nome')?.value,
        cpf: this.clientForm.get('cpf')?.value,
        data_de_Nascimento: this.clientForm.get('data_de_Nascimento')?.value,
        estado: this.clientForm.get('uf')?.value,
      };
      console.log('c', clientData);
      this.http
        .put(`http://localhost:5069/api/Client/${this.clientId}`, clientData)
        .subscribe({
          next: (data) => {
            this.openSuccessModal();
          },
          error: (error) => {
            console.error('Erro ao cadastrar cliente', error);
          },
        });
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  openSuccessModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/main']);
    });
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

  fetchClientData(id: number) {
    this.http
      .get<ClientFull>(`http://localhost:5069/api/Client/${id}`)
      .subscribe({
        next: (data) => {
          const formattedDate = new Date(data.data_de_Nascimento)
            .toISOString()
            .substring(0, 10);

          this.clientForm.patchValue({
            ...data,
            uf: data.estado,
            data_de_Nascimento: formattedDate,
          });
          this.clientForm.get('nome')?.disable();
          this.clientForm.get('cpf')?.disable();
          this.clientForm.get('data_de_Nascimento')?.disable();
          console.log('Cliente carregado com sucesso', data);
        },
        error: (error) => {
          console.error('Erro ao buscar cliente', error);
        },
      });
  }

  deleteClient() {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const clientId = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('clientId', clientId);
        if (clientId) {
          this.http
            .delete(`http://localhost:5069/api/Client/${clientId}`)
            .subscribe(
              () => {
                this.router.navigate(['/main']);
              },
              (error) => {
                console.error('Erro ao deletar cliente', error);
                alert('Erro ao deletar cliente');
              }
            );
        }
      }
    });
  }
}
