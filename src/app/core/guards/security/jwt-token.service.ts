import {Injectable} from "@angular/core";
import {Token} from "../model";
import {LocalStorageService} from "../../../../modules/utils/local-storage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class JwtTokenService {

  public static readonly TOKEN_KEY: string = "APPLICATION_TOKEN";

  constructor(private storage: LocalStorageService) {
  }

  get token(): Token {
    return new Token(this.storage.get(JwtTokenService.TOKEN_KEY));
  }

  set token(value: Token) {
    value ? this.storage.set(JwtTokenService.TOKEN_KEY, value.getToken()) : this.storage.remove(JwtTokenService.TOKEN_KEY);
  }

  public containsToken(): boolean {
    return this.storage.get(JwtTokenService.TOKEN_KEY) != null;
  }

}
