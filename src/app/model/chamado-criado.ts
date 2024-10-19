import {Prioridade} from "./enum/prioridade";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";
import {Equipamento} from "./equipamento";
import {Funcionario} from "./funcionario";

export class ChamadoCriado extends ModelImplModel {


  id: string;
  dataAbertura: Date;
  dataFechamento: Date;

  status: string;

  alocado: boolean = false

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



  constructor(id: string, dataAbertura: Date, dataFechamento: Date, status: string, alocado: boolean, equipamento: Equipamento, titulo: string, observacaoConsolidacao: string, observacoes: string, funcionario: Funcionario) {
    super();
    this.id = id;
    this.dataAbertura = dataAbertura;
    this.dataFechamento = dataFechamento;
    this.status = status;
    this.alocado = alocado;
    this.equipamento = equipamento;
    this.titulo = titulo;
    this.observacaoConsolidacao = observacaoConsolidacao;
    this.observacoes = observacoes;
    this.funcionario = funcionario;
  }
}
