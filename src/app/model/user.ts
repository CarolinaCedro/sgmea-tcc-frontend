import {Gestor} from "./gestor";
import {Perfil} from "./enum/perfil";
import {UserRole} from "./enum/user-role";


export class User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  gestor?: Gestor;
  perfil: Perfil;
  senha: string;
  role: UserRole;

  constructor(
    id: string,
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    role: UserRole,
    perfil: Perfil,
    gestor?: Gestor
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.role = role;
    this.perfil = perfil;
    this.gestor = gestor;
  }

  // Métodos que simulam a interface UserDetails
  getAuthorities(): string[] {
    switch (this.role) {
      case UserRole.ADMIN:
        return [
          'ROLE_ADMIN',
          'ROLE_GESTOR',
          'ROLE_FUNCIONARIO',
          'ROLE_TECNICO'
        ];
      case UserRole.GESTOR:
        return [
          'ROLE_GESTOR',
          'ROLE_FUNCIONARIO',
          'ROLE_TECNICO'
        ];
      case UserRole.TECNICO:
        return ['ROLE_TECNICO'];
      case UserRole.FUNCIONARIO:
        return ['ROLE_FUNCIONARIO'];
      default:
        return ['ROLE_FUNCIONARIO'];
    }
  }

  getPassword(): string {
    return this.senha;
  }

  getUsername(): string {
    return this.nome;
  }

  isAccountNonExpired(): boolean {
    return true;
  }

  isAccountNonLocked(): boolean {
    return true;
  }

  isCredentialsNonExpired(): boolean {
    return true;
  }

  isEnabled(): boolean {
    return true;
  }
}
