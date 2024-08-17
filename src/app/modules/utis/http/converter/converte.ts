import {deserialize, plainToClass, TransformOptions} from 'class-transformer';
import {Logg} from '../../logger/logger';
import {ListResource} from '../model/list-resource.model';
import {MetaData} from '../model/metadata.model';


export abstract class ClassSerialize<T> {
  public static readonly conf: TransformOptions = {toPlainOnly: true};

  abstract serialize(value: T): string;
}

export abstract class ClassDeserialize<T> {
  public static readonly conf: TransformOptions = {toClassOnly: true};

  abstract deserialize(value: string): T;
}

export function deserializeItem(value: object, clazz: any, log?: Logg): any {

  try {
    const result = deserialize(clazz, JSON.stringify(value)) as any;
    if (isNotNullOrUndefined(log)) {
      log?.d('payload response', result);
    }
    return result;
  } catch (error) {
    const errorResult = {};
    errorResult['error'] = error;
    errorResult['clazz'] = clazz;
    errorResult['payload'] = value;
    if (isNotNullOrUndefined(log)) {
      log?.e('error on deserialize item ', errorResult);
    }
    throw errorResult;
  }
}

export function deserializeArray(values, clazz: any, log?: Logg): Array<any> {
  let itens = new Array<any>();
  if (isNotNullOrUndefined(values)) {
    try {
      itens = <Array<any>>plainToClass(clazz, values);
      if (isNotNullOrUndefined(log)) {
        log?.d('payload response', itens);
      }
    } catch (error) {
      const errorResult = {};
      errorResult['error'] = error;
      errorResult['clazz'] = clazz;
      errorResult['payload'] = values;
      if (isNotNullOrUndefined(log)) {
        log?.e('error on deserialize ', errorResult);
      }
      throw errorResult;
    }
  }
  return itens;
}

export function deserializeListResource(value: any, clazz: any, log?: Logg): ListResource<any> {
  return value?.records
  // console.log("Entrou no converte", value);
  // const list = new ListResource<any>();
  //
  // if (isNotNullOrUndefined(value)) {
  //   try {
  //     console.log("value records", value?.records);
  //     // Desserializa apenas o campo "records"
  //     // list.records = <Array<any>>plainToClass(clazz, value?.records);
  //     list.records = value?.records;
  //     console.log("a lista agora", value?.records)
  //
  //
  //     if (value?.records) {
  //       list.records = plainToClass(clazz, value.records) as Array<any>;
  //     } else {
  //       list.records = [];
  //     }
  //
  //     // Ignora completamente o campo "_metadata"
  //     // list._metadata = null;  // ou simplesmente remova essa linha se não precisar definir explicitamente como null
  //
  //     if (isNotNullOrUndefined(log)) {
  //       log?.d('Payload response', list);
  //     }
  //   } catch (error) {
  //     const errorResult = {
  //       error: error,
  //       clazz: clazz,
  //       payload: value
  //     };
  //
  //     if (isNotNullOrUndefined(log)) {
  //       log?.e('Error on deserialize', errorResult);
  //     }
  //
  //     throw errorResult;
  //   }
  // } else {
  //   console.log("A lista está vazia");
  // }
  //
  // return list;
}


function isNotNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return false;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (!(value[i] === null || value[i] === undefined)) && result;
  }
  return result;
}
