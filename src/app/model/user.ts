import {Perfil} from "./enum/perfil";
import {Transform, Type} from "class-transformer";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";
import {Model} from "../modules/utis/http/model/model";
import {Gestor} from "./gestor";


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


}
