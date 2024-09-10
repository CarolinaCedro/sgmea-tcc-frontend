import {User} from "./user";
import {Especialidade} from "./especialidade";
import {ChamadoAtribuido} from "./chamado-atribuido";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";


export class Tecnico extends User {


  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Especialidade), Model.deserializeOpts())
  @Type(() => Especialidade)
  especialidades: Especialidade[] = [];
  disponibilidade?: boolean;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, ChamadoAtribuido), Model.deserializeOpts())
  @Type(() => ChamadoAtribuido)
  chamadoAtribuidos: ChamadoAtribuido[] = [];


  constructor(especialidades: Especialidade[], disponibilidade: boolean, chamadoAtribuidos: ChamadoAtribuido[]) {
    super();
    this.especialidades = especialidades;
    this.disponibilidade = disponibilidade;
    this.chamadoAtribuidos = chamadoAtribuidos;
  }
}
