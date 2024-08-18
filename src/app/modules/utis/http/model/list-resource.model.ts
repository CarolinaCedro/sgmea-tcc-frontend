export class ListResource<T> {

  records: Array<T>;

  constructor() {
    this.records = new Array();
  }

  public size(): number {
    return this.records.length;
  }

  public isEmpty(): boolean {
    if (!_isNullOrUndefined(this.records)) {
      return this.records.length === 0;
    }
    return true;
  }

  public clear(): ListResource<T> {
    this.records = new Array();
    return this;
  }

  public push(item: T): number {
    return this.records.push(item);
  }

  public pushAll(itens: Array<T> | ListResource<T>): ListResource<T> {
    let records;
    if (Array.isArray(itens)) {
      records = itens as Array<T>;
    } else {
      records = (itens as ListResource<T>).records;
    }
    records.forEach(i => this.push(i));
    return this;
  }


  public getById(id: string): T {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.records.filter(item => item['id'] === id)[0];
    }
  }


}

function _isNullOrUndefined(...value: any[]): boolean {
  console.log("is null or undefined", value)
  if (value === null || value === undefined) return true;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (value[i] === null || value[i] === undefined) && result;
  }
  return result;
}


export function isListResource(value: any): boolean {
  return value instanceof ListResource;
}
