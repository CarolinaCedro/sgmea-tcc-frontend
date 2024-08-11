import {Historic} from "./historic.model";
import {Transform} from "class-transformer";
import {DateDeserialize, DateSerialize} from "../../../../model/serializer/date-serializer";

export class HistoricImpl implements Historic {
  createdBy: string;
  @Transform(value => DateSerialize.serialize(value), DateSerialize.conf)
  @Transform(value => DateDeserialize.deserialize(value), DateDeserialize.conf)
  dtCreate: Date;
  lastChangeBy: string;
  @Transform(value => DateSerialize.serialize(value), DateSerialize.conf)
  @Transform(value => DateDeserialize.deserialize(value), DateDeserialize.conf)
  dtChange: Date;
}
