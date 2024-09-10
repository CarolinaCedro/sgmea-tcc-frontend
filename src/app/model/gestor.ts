import {AreaGestao} from "./enum/area-gestao";
import {User} from "./user";

export class Gestor extends User {


  // @Transform(value => Model.serialize(value), Model.serializeOpts())
  // @Transform(value => Model.deserialize(value, AreaGestao), Model.deserializeOpts())
  // @Type(() => AreaGestao)
  areaGestao: AreaGestao;


  constructor(areaGestao: AreaGestao) {
    super();
    this.areaGestao = areaGestao;
  }
}
