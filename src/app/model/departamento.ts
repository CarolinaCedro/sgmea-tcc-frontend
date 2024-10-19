import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";

export class Departamento extends ModelImplModel {

  id: string;
  nome: string;
  descricao: string;


  constructor(id: string, nome: string, descricao: string) {
    super();
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }
}
