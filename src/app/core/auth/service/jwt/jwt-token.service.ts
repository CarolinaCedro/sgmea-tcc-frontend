import { Injectable } from '@angular/core';
import { Token } from '../model/token';
import {LocalStorageService} from "../../../../modules/utis/localstorage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  public static readonly TOKEN_KEY: string = "token";

  constructor(private storage: LocalStorageService) {
  }

  get token(): Token {
    return new Token(this.storage.getItem(JwtTokenService.TOKEN_KEY));
  }

  set token(value: Token | null) {
    value ? this.storage.setItem(JwtTokenService.TOKEN_KEY, value.getToken()) : this.storage.removeItem(JwtTokenService.TOKEN_KEY);
  }

  public containsToken(): boolean {
    return this.storage.getItem(JwtTokenService.TOKEN_KEY) != null;
  }

}
