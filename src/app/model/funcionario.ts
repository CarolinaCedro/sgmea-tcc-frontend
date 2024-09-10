import {User} from "./user";
import {Departamento} from "./departamento";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";


export class Funcionario extends User {


  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Departamento), Model.deserializeOpts())
  @Type(() => Departamento)
  departamento?: Departamento;

  funcao?: string;
  // @Transform(value => Model.serialize(value), Model.serializeOpts())
  // @Transform(value => Model.deserialize(value, ChamadoCriado), Model.deserializeOpts())
  // @Type(() => ChamadoCriado)
  // chamadoCriados: ChamadoCriado[] = [];


  constructor(departamento: Departamento, funcao: string) {
    super();
    this.departamento = departamento;
    this.funcao = funcao;
  }
}
