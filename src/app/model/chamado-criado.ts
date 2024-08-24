import {Equipamento} from "./equipamento";
import {Prioridade} from "./enum/prioridade";
import {Status} from "./enum/status";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";
import {Funcionario} from "./funcionario";

export class ChamadoCriado extends ModelImplModel {


  id: string;
  dataAbertura: Date;
  dataFechamento: Date;
  prioridade: Prioridade;
  status: Status;
  equipamento: Equipamento;
  titulo: string;
  observacaoConsolidacao: string;
  observacoes: string;

  funcionario: Funcionario;


  constructor(id: string, dataAbertura: Date, dataFechamento: Date, prioridade: Prioridade, status: Status, equipamento: Equipamento, titulo: string, observacaoConsolidacao: string, observacoes: string) {
    super();
    this.id = id;
    this.dataAbertura = dataAbertura;
    this.dataFechamento = dataFechamento;
    this.prioridade = prioridade;
    this.status = status;
    this.equipamento = equipamento;
    this.titulo = titulo;
    this.observacaoConsolidacao = observacaoConsolidacao;
    this.observacoes = observacoes;
  }
}
