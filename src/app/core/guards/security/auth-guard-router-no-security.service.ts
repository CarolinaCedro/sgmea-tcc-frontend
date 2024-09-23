import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/service/auth/auth.service";


const HOME = ["home/dashboard"];

/**
 * Guardião especifico para a tela de login e cadastro de usuário
 */
@Injectable({
  providedIn: "root"
})
export class AuthGuardRouterNoSecurityService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //se não tiver logado podemos deixar acessar a pagina de login ou a de cadastro de usuário
    if (!this.auth.isLoged) {
      return true;
    }
    //já está logado.
    this.router.navigate(HOME);
    return false;
  }

}
