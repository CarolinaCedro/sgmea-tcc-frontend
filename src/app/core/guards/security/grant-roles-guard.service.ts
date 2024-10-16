import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {AuthService} from "../../auth/service/auth/auth.service";


const UNAUTHORIZATION_URL = ["unauthorized-exception"];

@Injectable({
  providedIn: "root"
})
export class GrantRolesGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.hasAnyRole(route.data.roles)
      .pipe(
        take(1),
        map(result => {
          //se não tiver logado devemos redirecionar o mesmo para o login jutamente com o redirecionamento após o login
          if (!result) {
            this.router.navigate(UNAUTHORIZATION_URL);
          }
          return true;
        })
      );
  }
}

