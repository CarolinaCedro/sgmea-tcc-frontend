
import {Departamento} from "./departamento";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";
import {Gestor} from "./gestor";
import {Perfil} from "./enum/perfil";
import {User} from "./user";


export class Funcionario extends User {


  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Departamento), Model.deserializeOpts())
  @Type(() => Departamento)
  departamento?: Departamento;

  funcao?: string;


  constructor(id: string, nome: string, cpf: string, email: string, gestor: Gestor, perfil: Perfil, senha: string, authorities: [], departamento: Departamento, funcao: string) {
    super(id, nome, cpf, email, gestor, perfil, senha, authorities);
    this.departamento = departamento;
    this.funcao = funcao;
  }
}
