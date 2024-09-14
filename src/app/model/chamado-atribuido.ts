import {ChamadoCriado} from "./chamado-criado";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";
import {Tecnico} from "./tecnico";
import {Gestor} from "./gestor";
import {Prioridade} from "./enum/prioridade";


export class ChamadoAtribuido extends ModelImplModel {
  constructor(id: string, chamadoCriado: ChamadoCriado, tecnico: Tecnico, gestor: Gestor, prioridade: Prioridade) {
    super();
    this.id = id;
    this.chamadoCriado = chamadoCriado;
    this.tecnico = tecnico;
    this.gestor = gestor;
    this.prioridade = prioridade;

  }


  id: string;
  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, ChamadoCriado), Model.deserializeOpts())
  @Type(() => ChamadoCriado)
  chamadoCriado: ChamadoCriado;

  titulo: string

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Tecnico), Model.deserializeOpts())
  @Type(() => Tecnico)
  tecnico: Tecnico;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Gestor), Model.deserializeOpts())
  @Type(() => Gestor)
  gestor: Gestor;

  prioridade: Prioridade;


}
