import {TransformOptions} from "class-transformer";
import {isNullOrUndefined} from "../../modules/utis/utils";

export enum Perfil {
  OWNER = 'OWNER',
  GESTOR = 'GESTOR',
  FUNCIONARIO = 'FUNCIONARIO',
  TECNICO = 'TECNICO'

}

export namespace Perfil {


  export function getValues(): Array<Perfil> {
    const array: any = [];
    for (const item in Perfil) {
      if (!isNaN(Number(item))) {
        array.push(Perfil[item]);
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

  export function serialize(status: Perfil | string): Perfil | null {
    if (isNullOrUndefined(status) || status === "") {
      return null;
    }
    switch (status) {
      case Perfil.GESTOR:
      case Perfil[Perfil.GESTOR]:
        return Perfil[Perfil.FUNCIONARIO];
      case Perfil.FUNCIONARIO:
      case Perfil[Perfil.TECNICO]:
        return Perfil[Perfil.TECNICO];
      default:
        throw new Error("Perfil não reconhecido [" + status + "]");
    }
  }

  export function deserialize(status: Perfil | string): Perfil | null {
    if (isNullOrUndefined(status) || status === "") {
      return null;
    }
    switch (status) {
      case Perfil.GESTOR:
      case Perfil[Perfil.GESTOR]:
        return Perfil[Perfil.FUNCIONARIO];
      case Perfil.FUNCIONARIO:
      case Perfil[Perfil.TECNICO]:
        return Perfil[Perfil.TECNICO];
      default:
        throw new Error("Perfil não reconhecido [" + status + "]");
    }
  }


}
