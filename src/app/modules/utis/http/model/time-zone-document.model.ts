export class TimeZoneDocument {
  /**
   * Deve conter informações do timezone corrente do registro
   */
  currentTimeZone!: string;

  /**
   * Deve conter informações do timezone de criação do registro
   */
  createTimeZone!: string;

  /**
   * Deve conter informações do timezone corrente do registro por parte do servidor
   */
  serverCurrentTimeZone!: string;

  /**
   * Deve conter informações do timezone de criação do registro por parte do servidor
   */
  serverCreteTimeZone!: string;
}

export function instanceOfTimeZoneDocument(value: any): boolean {
  return Object.prototype.hasOwnProperty.call(value, "currentTimeZone")
    && Object.prototype.hasOwnProperty.call(value, "createTimeZone")
    && Object.prototype.hasOwnProperty.call(value, "serverCurrentTimeZone")
    && Object.prototype.hasOwnProperty.call(value, "serverCreteTimeZone")
}
