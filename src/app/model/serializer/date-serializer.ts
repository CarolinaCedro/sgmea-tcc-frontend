import {TransformOptions} from "class-transformer";
import moment from "moment";

import {instanceOfMetadataDocument, MetadataDocument} from "../../modules/utis/http/model/metadata-document.model";
import {instanceOfTimeZoneDocument, TimeZoneDocument} from "../../modules/utis/http/model/time-zone-document.model";
import {isDate, isNotNullOrUndefined, isNullOrUndefined, isString} from "../../modules/utis/utils";
import {toFirstHour, toMoment} from "../../modules/utis/date-utils";

const DATE_PATTERN = "YYYY-MM-DDTHH:mm:ss.SSSZZ";

export class DateSerialize {

  public static readonly conf: TransformOptions = {toPlainOnly: true};


  static serialize(date: Date, pattern?: string, offSet?: string | MetadataDocument | TimeZoneDocument | number): string | null {


    if (isNullOrUndefined(date)) {
      return null;
    }
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }
    const localOffSet: string | null = extractOffset(offSet);

    return isNotNullOrUndefined(localOffSet) ?
      moment(date).utcOffset(localOffSet).format(pattern) :
      moment(date).format(pattern);
  }
}

function extractOffset(offSet): string | null {


  //let localOffSet: string = null;
  if (isNotNullOrUndefined(offSet)) {
    if (isString(offSet)) {
      return offSet as string;
    } else if (instanceOfMetadataDocument(offSet)) {
      const metadata = offSet as MetadataDocument;
      if (isNotNullOrUndefined(metadata.timeZones)) {
        return metadata.timeZones.currentTimeZone;
      }
    } else if (instanceOfTimeZoneDocument(offSet)) {
      return (offSet as TimeZoneDocument).currentTimeZone;

      //se chegou até aqui é sinal que nao conseguiu fazer cast
      //verificando se tem um campo chamado timeZones
    } else if (isNotNullOrUndefined(offSet["timeZones"])) {
      const timeZones = offSet["timeZones"];
      if (isNotNullOrUndefined(timeZones["currentTimeZone"])) {
        return timeZones["currentTimeZone"];
      }

      //se chegou até aqui é sinal que nao conseguiu fazer cast
      //e o valor passado não tem uma propriedade chamada timeZones
      //vamos tentar pegar uma propriedade chamada currentTimeZone
    } else if (isNotNullOrUndefined(offSet["currentTimeZone"])) {
      return offSet["currentTimeZone"];
    }
  } else {
    return null;
  }
  throw new Error("O offSet informado é invalido => " + offSet);
}

export class DateDeserialize {


  public static readonly conf: TransformOptions = {toClassOnly: true};

  static deserializeLog(date, value) {
    console.log("value", value);
    return DateDeserialize.deserialize(date);
  }

  static deserialize(date: any, pattern?: string, offSet?: string | MetadataDocument | TimeZoneDocument): Date | null {


    if (isNullOrUndefined(date) || date === "") {
      return null;
    }
    if (isDate(date)) {
      return date as Date;
    }
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }


    const localOffSet: string | null = extractOffset(offSet);

    const current = isNotNullOrUndefined(localOffSet) ?
      moment(date, pattern).utcOffset(localOffSet) :
      moment(date, pattern);

    if (!current.isValid()) {
      return null;
    }

    return current.toDate();
  }

}

export class DefaultDatePattern {
  static readonly yyyyMMddTHHmmssSSSZ: string = "YYYY-MM-DDTHH:mm:ss.SSSZZ";
  static readonly yyyyMMdd: string = "yyyy-MM-dd";
  static readonly HHmmss: string = "HH:mm:ss";
  static readonly HHmm: string = "HH:mm";
}

export function isToday(date: Date): boolean {
  return toMoment(toFirstHour(date)).isSame(toMoment(toFirstHour(new Date())));
}
