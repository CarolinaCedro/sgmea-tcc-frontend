import {ModelImplModel} from "../../utis/http/model/model-impl.model";

export class Dashboard extends ModelImplModel {
  chamadosCriticos: number;
  chamadosPendentes: number;
  chamadosConcluidos: number;
  chamadosAbertos: number;
  equipamentos: number;
  chartData: any;
  thisWeek: number[];
  lastWeek: number[];
  labels: string[];


  constructor(chamadosCriticos: number, chamadosPendentes: number, chamadosConcluidos: number, chamadosAbertos: number, equipamentos: number, chartData: any, thisWeek: number[], lastWeek: number[], labels: string[]) {
    super();
    this.chamadosCriticos = chamadosCriticos;
    this.chamadosPendentes = chamadosPendentes;
    this.chamadosConcluidos = chamadosConcluidos;
    this.chamadosAbertos = chamadosAbertos;
    this.equipamentos = equipamentos;
    this.chartData = chartData;
    this.thisWeek = thisWeek;
    this.lastWeek = lastWeek;
    this.labels = labels;
  }
}

