import {MetadataDocument} from "./metadata-document.model";
import {Transform, Type} from "class-transformer";
import {Domain} from "./domain.enum";
import {TimeZoneDocument} from "./time-zone-document.model";
import {VersionDocument} from "./version-document.model";
import {Historic} from "./historic.model";
import {TimeZoneDocumentImpl} from "./timezone-impl";
import {VersionDocumentImpl} from "./versionDocumentImpl";
import {HistoricImpl} from "./historicImpl";


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
