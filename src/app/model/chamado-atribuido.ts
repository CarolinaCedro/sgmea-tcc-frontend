import {ChamadoCriado} from "./chamado-criado";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";


export class ChamadoAtribuido extends ModelImplModel {


  id: string;
  chamadoCriado: ChamadoCriado;
  // tecnico: Tecnico;
  // gestor: Gestor;


  constructor(id: string, chamadoCriado: ChamadoCriado) {
    super();
    this.id = id;
    this.chamadoCriado = chamadoCriado;
  }
}
