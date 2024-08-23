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
  endereco: Endereco;
}

interface Endereco {
  end1: string;
  end2: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}
