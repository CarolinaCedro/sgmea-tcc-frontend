import {User} from "./user";
import {Especialidade} from "./especialidade";
import {ChamadoAtribuido} from "./chamado-atribuido";
import {UserRole} from "./enum/user-role";
import {Perfil} from "./enum/perfil";
import {Gestor} from "./gestor";


export class Tecnico extends User {
  especialidades: Especialidade[] = [];
  disponibilidade?: boolean;
  chamadoAtribuidos: ChamadoAtribuido[] = [];


  constructor(id: string, nome: string, cpf: string, email: string, senha: string, role: UserRole, perfil: Perfil, gestor: Gestor, especialidades: Especialidade[], disponibilidade: boolean, chamadoAtribuidos: ChamadoAtribuido[]) {
    super(id, nome, cpf, email, senha, role, perfil, gestor);
    this.especialidades = especialidades;
    this.disponibilidade = disponibilidade;
    this.chamadoAtribuidos = chamadoAtribuidos;
  }
}
