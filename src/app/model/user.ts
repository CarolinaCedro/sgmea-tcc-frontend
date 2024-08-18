import {Perfil} from "./enum/perfil";
import {UserRole} from "./enum/user-role";
import {Transform} from "class-transformer";
import {ModelImplModel} from "../modules/utis/http/model/model-impl.model";


export class User extends ModelImplModel {

  id: string;
  nome: string;
  cpf: string;
  email: string;

  // @Transform(value => Model.serialize(value), Model.serializeOpts())
  // @Transform(value => Model.deserialize(value, Gestor), Model.deserializeOpts())
  // @Type(() => Gestor)
  // gestor?: Gestor | null;


  @Transform(value => Perfil.serialize(value), Perfil.serializeOpts())
  @Transform(value => Perfil.deserialize(value), Perfil.deserializeOpts())
  perfil: Perfil;
  senha: string;


  @Transform(value => UserRole.serialize(value), UserRole.serializeOpts())
  @Transform(value => UserRole.deserialize(value), UserRole.deserializeOpts())
  role: UserRole;


// Métodos que simulam a interface UserDetails
  getAuthorities(): string[] {
    switch (this.role) {
      case UserRole.ADMIN:
        return [
          'ROLE_ADMIN',
          'ROLE_GESTOR',
          'ROLE_FUNCIONARIO',
          'ROLE_TECNICO'
        ];
      case UserRole.GESTOR:
        return [
          'ROLE_GESTOR',
          'ROLE_FUNCIONARIO',
          'ROLE_TECNICO'
        ];
      case UserRole.TECNICO:
        return ['ROLE_TECNICO'];
      case UserRole.FUNCIONARIO:
        return ['ROLE_FUNCIONARIO'];
      default:
        return ['ROLE_FUNCIONARIO'];
    }
  }
}
