export interface Client {
  id: number;
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
  data_de_Nascimento: string;
  telefone: string;
  CEP: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface UserLoginResponse {
  nome: string;
  email: string;
  senha: string;
  role: string;
}
