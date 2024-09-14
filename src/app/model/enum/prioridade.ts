// prioridade.enum.ts

import {Exclude} from "class-transformer";

export enum Prioridade {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

export namespace Prioridade {
  const codigoMap: { [key: number]: Prioridade } = {
    0: Prioridade.BAIXA,
    1: Prioridade.MEDIA,
    2: Prioridade.ALTA,
  };

  const descricaoMap: { [key in Prioridade]: string } = {
    [Prioridade.BAIXA]: 'BAIXA',
    [Prioridade.MEDIA]: 'MEDIA',
    [Prioridade.ALTA]: 'ALTA',
  };

  export function getDescricao(prioridade: Prioridade): string {
    return descricaoMap[prioridade];
  }

  export function fromCodigo(codigo: number): Prioridade | null {
    return codigoMap[codigo] || null;
  }



}
