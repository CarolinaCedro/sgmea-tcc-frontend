export class Token {
  private _token: string ;

  constructor(token: string ) {
    this._token = token;
  }

  getToken(): string {
    return this._token;
  }

  setToken(token: string): Token {
    this._token = token;
    return this;
  }

}
