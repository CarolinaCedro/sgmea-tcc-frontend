import {Model} from "./model";
import {Exclude, Transform, Type} from "class-transformer";
import {DateDeserialize, DateSerialize} from "../../../../model/serializer/date-serializer";
import {MetadataDocument} from "./metadata-document.model";
import {Domain} from "./domain.enum";
import {TimeZoneDocument} from "./time-zone-document.model";
import {VersionDocument} from "./version-document.model";
import {Historic} from "./historic.model";


const OBJECT_ID_PATTENR = /^[0-9A-F]{24}$/i;

export class ModelImplModel implements Model {
  id: string;

  sync: string;

  @Transform(value => DateSerialize.serialize(value), DateSerialize.conf)
  @Transform(value => DateDeserialize.deserialize(value), DateDeserialize.conf)
  dtSync: Date;

  @Type(() => MetadataDocumentImpl)
  metadata: MetadataDocument;

  @Exclude()
  containsValidObjectId(): boolean {
    return OBJECT_ID_PATTENR.test(this.id);
  }

  document: any;


}


export class MetadataDocumentImpl implements MetadataDocument {

  @Transform(value => Domain.serialize(value), Domain.serializeOpts())
  @Transform(value => Domain.deserialize(value), Domain.deserializeOpts())
  domain: Domain;

  @Type(() => TimeZoneDocumentImpl)
  timeZones: TimeZoneDocument;

  @Type(() => VersionDocumentImpl)
  versionDocument: VersionDocument;

  @Type(() => HistoricImpl)
  historic: Historic;
}

export class TimeZoneDocumentImpl implements TimeZoneDocument {
  /**
   * Deve conter informações do timezone corrente do registro
   */
  currentTimeZone: string;

  /**
   * Deve conter informações do timezone de criação do registro
   */
  createTimeZone: string;

  /**
   * Deve conter informações do timezone corrente do registro por parte do servidor
   */
  serverCurrentTimeZone: string;

  /**
   * Deve conter informações do timezone de criação do registro por parte do servidor
   */
  serverCreteTimeZone: string;
}

export class VersionDocumentImpl implements VersionDocument {
  /**
   * Nome do cliente que criou o documento
   */
  originNameClientCreate: string;

  /**
   * Versão do cliente que criou o documento
   */
  originVersionClientCreate: string;

  /**
   * Versão do servidor em que foi criado o documento
   */
  serverVersionCreate: string;

  /**
   * Nome do cliente que fez a atualização do documento
   */
  originNameClientLastUpdate: string;

  /**
   * Versão do cliente que fez a ultima atualização do documento
   */
  originVersionClientLastUpdate: string;

  /**
   * Versão do servidor em que foi atualizado o documento
   */
  serverVersionLastUpdate: string;
}

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
