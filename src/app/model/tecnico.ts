import {User} from "./user";
import {Especialidade} from "./especialidade";
import {ChamadoAtribuido} from "./chamado-atribuido";


export class Tecnico extends User {
  especialidades: Especialidade[] = [];
  disponibilidade?: boolean;
  chamadoAtribuidos: ChamadoAtribuido[] = [];


  constructor(especialidades: Especialidade[], disponibilidade: boolean, chamadoAtribuidos: ChamadoAtribuido[]) {
    super();
    this.especialidades = especialidades;
    this.disponibilidade = disponibilidade;
    this.chamadoAtribuidos = chamadoAtribuidos;
  }
}
