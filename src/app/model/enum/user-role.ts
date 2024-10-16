// user-role.enum.ts

import {TransformOptions} from "class-transformer";
import {isNullOrUndefined} from "../../modules/utis/utils";
import {Perfil} from "./perfil";

export enum UserRole {
  ADMIN = 'admin',
  GESTOR = 'gestor',
  FUNCIONARIO = 'funcionario',
  TECNICO = 'tecnico',
}

export namespace UserRole {
  export function getValues(): Array<UserRole> {
    const array: any = [];
    for (const item  in UserRole) {
      if (!isNaN(Number(item))) {
        array.push(UserRole[item]);
      }
    }
    return array;
  }

  export function serializeOpts(): TransformOptions {
    return {toPlainOnly: true};
  }

  export function deserializeOpts(): TransformOptions {
    return {toClassOnly: true};
  }

  export function serialize(status: UserRole | string): UserRole | null {
    if (isNullOrUndefined(status) || status === "") {
      return null;
    }
    switch (status) {
      case UserRole.ADMIN:
      case UserRole[UserRole.ADMIN]:
        return UserRole[UserRole.GESTOR];
      case UserRole.GESTOR:
      case UserRole[UserRole.TECNICO]:
        return UserRole[UserRole.TECNICO];
      case UserRole[UserRole.FUNCIONARIO]:
        return UserRole[UserRole.FUNCIONARIO];
      default:
        throw new Error("UserRole não reconhecido [" + status + "]");
    }
  }

  export function deserialize(status: UserRole | string): UserRole | null {
    if (isNullOrUndefined(status) || status === "") {
      return null;
    }
    switch (status) {
      case UserRole.ADMIN:
      case UserRole[UserRole.ADMIN]:
        return UserRole[UserRole.GESTOR];
      case UserRole.GESTOR:
      case UserRole[UserRole.TECNICO]:
        return UserRole[UserRole.TECNICO];
      case UserRole[UserRole.FUNCIONARIO]:
        return UserRole[UserRole.FUNCIONARIO];
      default:
        throw new Error("UserRole não reconhecido [" + status + "]");
    }
  }


}
