import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";

export class Equipamento extends ModelImplModel {


  id: string;
  nome: string;
  descricao: string;
  fabricante: string;
  modelo: string;
  emUso: boolean;


  constructor(id: string, nome: string, descricao: string, fabricante: string, modelo: string, emUso: boolean) {
    super();
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.fabricante = fabricante;
    this.modelo = modelo;
    this.emUso = emUso;
  }


}
