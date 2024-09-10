import {ChamadoCriado} from "./chamado-criado";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";


export class ChamadoAtribuido extends ModelImplModel {


  id: string;
  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, ChamadoCriado), Model.deserializeOpts())
  @Type(() => ChamadoCriado)
  chamadoCriado: ChamadoCriado;
  // tecnico: Tecnico;
  // gestor: Gestor;


  constructor(id: string, chamadoCriado: ChamadoCriado) {
    super();
    this.id = id;
    this.chamadoCriado = chamadoCriado;
  }
}
