import {Model} from "./model";
import {Exclude, Transform, Type} from "class-transformer";
import {DateDeserialize, DateSerialize} from "../../../../model/serializer/date-serializer";
import {MetadataDocument} from "./metadata-document.model";
import {MetadataDocumentImpl} from "./metadata-document-impl";

import "reflect-metadata";


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


