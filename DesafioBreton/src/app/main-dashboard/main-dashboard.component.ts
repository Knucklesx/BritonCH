import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importe o Router
import { Client } from '../helper/client.interface';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];

  constructor(private http: HttpClient, private router: Router) {} // Injete o Router

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.http.get<Client[]>('http://localhost:5069/api/Client').subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = data;
        console.log('Clientes carregados com sucesso', data);
      },

      error: (error) => {
        console.error('Erro ao buscar clientes', error);
      },
    });
  }

  filterClients(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredClients = this.clients.filter(
      (client) =>
        client.nome.toLowerCase().includes(query) ||
        client.telefone.toLowerCase().includes(query) ||
        client.cpf.toLowerCase().includes(query)
    );
  }

  addClient() {
    this.router.navigate(['/client-register']); // Redirecione para a rota /register-client
  }

  editClient(clientId: number) {
    console.log('Editando cliente', clientId);
    this.router.navigate(['/edit-client', clientId]);
  }
}
