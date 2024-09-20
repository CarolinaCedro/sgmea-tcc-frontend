import {isEmpty, isNotNullOrUndefined} from "../../utis/utils";

export class Report {
  private _fileName: string = `Chamado - ${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date().getFullYear()}`;
  private _report: Blob;
  private _localUrl: string;

  constructor(url: string) {

  }

  get fileName(): string {
    return this._fileName;
  }

  get report(): Blob {
    return this._report;
  }

  getLocalUrl(): string {
    if (isEmpty(this._localUrl)) {
      this.generateLocalUrl();
    }
    return this._localUrl;
  }

  generateLocalUrl(): Report {
    if (isEmpty(this._localUrl) && isNotNullOrUndefined(this.report)) {
      this._localUrl = URL.createObjectURL(this.report);
    }
    return this;
  }

  revolkerUrl(): Report {
    if (!isEmpty(this._localUrl)) {
      URL.revokeObjectURL(this._localUrl);
      this._localUrl = null;
    }
    return this;
  }

  public static newReportFrom(blob?: Blob): Report {
    // Verifica se o Blob é nulo ou indefinido
    if (!blob) {
      return null;
    }

    // Cria o relatório com o URL temporário do Blob
    const report = new Report(URL.createObjectURL(blob));


    // Não podemos acessar os headers aqui porque estamos lidando apenas com o Blob
    report._report = blob; // Armazena o Blob no relatório
    return report;
  }


}
