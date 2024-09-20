import {Perfil} from "./enum/perfil";
import {Transform, Type} from "class-transformer";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";
import {Model} from "../modules/utis/http/model/model";
import {Gestor} from "./gestor";
import {Role} from "../core/roles/model/role";
import {Authority} from "../core/roles/model/authority";


export class User extends ModelImplModel {

  id: string;
  nome: string;
  cpf: string;
  email: string;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Gestor), Model.deserializeOpts())
  @Type(() => Gestor)
  gestor?: Gestor;


  @Transform(value => Perfil.serialize(value), Perfil.serializeOpts())
  @Transform(value => Perfil.deserialize(value), Perfil.deserializeOpts())
  perfil: Perfil;
  senha: string;

  @Type(() => Authority)
  authorities: Authority[];


  constructor(id: string, nome: string, cpf: string, email: string, gestor: Gestor, perfil: Perfil, senha: string, authorities: Authority[]) {
    super();
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.gestor = gestor;
    this.perfil = perfil;
    this.senha = senha;
    this.authorities = authorities;
  }
}
