import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/service/auth/auth.service";



const LOGIN_URL = ["auth/sign-in"];

@Injectable({
  providedIn: "root"
})
export class AuthGuardRouterSecurityService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //Caso esteja logado deixa o fluxo seguir
    if (this.auth.isLoged) {
      return true;
    }
    //se não tiver logado devemos redirecionar o mesmo para o login jutamente com o redirecionamento após o login
    //this.router.navigate(LOGIN_URL, {queryParams: {"afterLogin": state.url}});
    this.router.navigate(LOGIN_URL);
    return false;
  }

}
