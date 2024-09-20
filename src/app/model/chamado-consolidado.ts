import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";

export class ChamadoConsolidado extends ModelImplModel {

  id: string;
  observacaoConsolidacao: string


  constructor(id: string, observacaoConsolidacao: string) {
    super();
    this.id = id;
    this.observacaoConsolidacao = observacaoConsolidacao;
  }
}
