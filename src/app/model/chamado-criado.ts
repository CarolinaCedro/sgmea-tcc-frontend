import {Funcionario} from "./funcionario";
import {Equipamento} from "./equipamento";
import {Prioridade} from "./enum/prioridade";
import {Status} from "./enum/status";

export class ChamadoCriado {


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


  constructor(id: string, dataAbertura: Date, dataFechamento: Date, prioridade: Prioridade, status: Status, equipamento: Equipamento, titulo: string, observacaoConsolidacao: string, observacoes: string, funcionario: Funcionario) {
    this.id = id;
    this.dataAbertura = dataAbertura;
    this.dataFechamento = dataFechamento;
    this.prioridade = prioridade;
    this.status = status;
    this.equipamento = equipamento;
    this.titulo = titulo;
    this.observacaoConsolidacao = observacaoConsolidacao;
    this.observacoes = observacoes;
    this.funcionario = funcionario;
  }
}
