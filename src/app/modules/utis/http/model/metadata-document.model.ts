import {Domain} from "./domain.enum";
import {TimeZoneDocument} from "./time-zone-document.model";
import {VersionDocument} from "./version-document.model";
import {Historic} from "./historic.model";

export class MetadataDocument {

  domain!: Domain;

  timeZones!: TimeZoneDocument;

  versionDocument!: VersionDocument;

  historic!: Historic;
}
export function instanceOfMetadataDocument(value: unknown): boolean {
  return Object.prototype.hasOwnProperty.call(value, "domain")
    && Object.prototype.hasOwnProperty.call(value, "timeZones")
    && Object.prototype.hasOwnProperty.call(value, "versionDocument")
    && Object.prototype.hasOwnProperty.call(value, "historic")
}
