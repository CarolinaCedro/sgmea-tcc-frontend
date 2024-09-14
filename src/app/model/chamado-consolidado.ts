import {Funcionario} from "./funcionario";
import {Gestor} from "./gestor";
import {Tecnico} from "./tecnico";
import {Equipamento} from "./equipamento";
import {Status} from "./enum/status";
import {Prioridade} from "./enum/prioridade";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";

export class ChamadoConsolidado extends ModelImplModel{

  id;
  dataAbertura: Date;
  dataFechamento: Date;
  prioridade: Prioridade;
  status: Status;
  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Equipamento), Model.deserializeOpts())
  @Type(() => Equipamento)
  equipamento: Equipamento;

  titulo: string;
  observacaoConsolidacao: string;
  observacoes: string;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Funcionario), Model.deserializeOpts())
  @Type(() => Funcionario)
  funcionario: Funcionario;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Gestor), Model.deserializeOpts())
  @Type(() => Gestor)
  gestor: Gestor;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Tecnico), Model.deserializeOpts())
  @Type(() => Tecnico)
  tecnico: Tecnico;

}
