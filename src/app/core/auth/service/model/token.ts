export class Token {
  private _token: string  | null;

  constructor(token: string | null) {
    this._token = token;
  }

  getToken(): string {
    return <string>this._token;
  }

  setToken(token: string): Token {
    this._token = token;
    return this;
  }

}
