import {Tecnico} from "./tecnico";
import {ChamadoCriado} from "./chamado-criado";
import {Gestor} from "./gestor";

export class ChamadoAtribuido {


  id: string;
  chamadoCriado: ChamadoCriado;
  tecnico: Tecnico;
  gestor: Gestor;


  constructor(id: string, chamadoCriado: ChamadoCriado, tecnico: Tecnico, gestor: Gestor) {
    this.id = id;
    this.chamadoCriado = chamadoCriado;
    this.tecnico = tecnico;
    this.gestor = gestor;
  }
}
