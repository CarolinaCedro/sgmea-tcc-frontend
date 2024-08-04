import { Perfil } from './enum/perfil';

export class UserLogin {
  nome: string;
  email: string;
  cpf: string;
  perfil: Perfil;
  senha: string;
  role: string;

  constructor(nome: string, email: string, cpf: string, perfil: Perfil, senha: string, role: string) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.perfil = perfil;
    this.senha = senha;
    this.role = role;
  }
}
