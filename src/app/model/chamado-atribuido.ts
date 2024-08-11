
import {ChamadoCriado} from "./chamado-criado";


export class ChamadoAtribuido {


  id: string;
  chamadoCriado: ChamadoCriado;
  // tecnico: Tecnico;
  // gestor: Gestor;


  constructor(id: string, chamadoCriado: ChamadoCriado) {
    this.id = id;
    this.chamadoCriado = chamadoCriado;
    // this.tecnico = tecnico;
    // this.gestor = gestor;
  }
}
