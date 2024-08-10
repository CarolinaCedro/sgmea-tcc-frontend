export class Equipamento {


  id: string;
  nome: string;
  descricao: string;
  fabricante: string;
  modelo: string;
  emUso: boolean;


  constructor(id: string, nome: string, descricao: string, fabricante: string, modelo: string, emUso: boolean) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.fabricante = fabricante;
    this.modelo = modelo;
    this.emUso = emUso;
  }
}
