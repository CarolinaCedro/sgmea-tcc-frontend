import {AreaGestao} from "./enum/area-gestao";
import {User} from "./user";
import {Perfil} from "./enum/perfil";

export class Gestor extends User {


  // @Transform(value => Model.serialize(value), Model.serializeOpts())
  // @Transform(value => Model.deserialize(value, AreaGestao), Model.deserializeOpts())
  // @Type(() => AreaGestao)
  areaGestao: AreaGestao;


  constructor(id: string, nome: string, cpf: string, email: string, gestor: Gestor, perfil: Perfil, senha: string, authorities: [], areaGestao: AreaGestao) {
    super(id, nome, cpf, email, gestor, perfil, senha, authorities);
    this.areaGestao = areaGestao;
  }
}
