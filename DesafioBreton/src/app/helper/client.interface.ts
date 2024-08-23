export interface Client {
  nome: string;
  telefone: string;
  cpf: string;
  data_de_nascimento: string;
  CEP: string;
}

export interface ClientFull {
  id: number;
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  telefone: string;
  CEP: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}
