
import {Exclude} from "class-transformer";
import {isEmpty, isNotNullOrUndefined, isNullOrUndefined} from "../../utils";


export class MetaData {
  @Exclude()
  private _totalLoadedRecords!: number;
  page!: number;
  pageSize!: number;
  totalPages!: number;
  totalRecords!: number;
  totalAll!: number;
  links!: Link[];

  constructor(inst?: any) {
    // @ts-ignore
    this.links = new Array();
    if (isNotNullOrUndefined(inst)) {
      this.page = inst.page;
      this.pageSize = inst.pageSize;
      this.totalPages = inst.totalPages;
      this.totalRecords = inst.totalRecords;
      this.totalRecords = inst.totalRecords;

      this.totalLoadedRecords = this.pageSize;
      if (!isEmpty(inst.links)) {
        // @ts-ignore
        inst.links.forEach(l => this.links.push(new Link(l)));
      }
    }
  }


  get totalLoadedRecords(): number {
    if (isNullOrUndefined(this._totalLoadedRecords)) {
      this._totalLoadedRecords = this.pageSize;
    }
    return this._totalLoadedRecords;
  }

  set totalLoadedRecords(value: number) {
    this._totalLoadedRecords = value;
  }

  public hasFirstPage(): boolean {
    return this.hasRel("first");
  }

  public firstPage(): string {
    return this.getHref("first");
  }

  public hasPreviusPage(): boolean {
    return this.hasRel("previus");
  }

  public previusPage(): string {
    return this.getHref("previus");
  }

  public hasNextPage(): boolean {
    return this.hasRel("next");
  }

  public nextPage(): string {
    return this.getHref("next");
  }

  public hasLastPage(): boolean {
    return this.hasRel("last");
  }

  public lastPage(): string {
    return this.getHref("last");
  }

  protected hasRel(rel: string): boolean {
    // @ts-ignore
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].rel === rel) {
        return true;
      }
    }
    return false;
  }

  protected getHref(rel: string): string {
    // @ts-ignore
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].rel === rel) {
        return this.links[i].href;
        /*return environment.ts.production ?
          this.links[i].href :
          this.links[i].href.substr(this.links[i].href.indexOf("/api/"))
          ;*/
      }
    }
    return "";
  }

  add(meta: MetaData): MetaData {
    this.page = meta.page;
    this.pageSize = meta.pageSize;
    this.totalPages = meta.totalPages;
    this.totalRecords = meta.totalRecords;
    this.totalAll = meta.totalAll;
    this.totalLoadedRecords += this.pageSize;
    this.links = meta.links;
    return this;
  }
}

export class Link {
  rel: string;
  href: string;

  constructor(inst?: any) {
    if (isNotNullOrUndefined(inst)) {
      this.rel = inst.rel;
      this.href = inst.href;
    }
  }
}
