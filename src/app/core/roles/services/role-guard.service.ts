import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../auth/service/auth/auth.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {User} from "../../../model/user";
import {Role} from "../model/role";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredRoles: Role[] = route.data['roles'];

    return this.authService.userCurrent.pipe(
      map(user => {
        if (user && this.hasRole(user.authorities, requiredRoles)) { // authorities agora é um array de strings
          return true;
        }

        this.router.navigate(['/unauthorized']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }

  private hasRole(userAuthorities: string[], requiredRoles: Role[]): boolean {
    return requiredRoles.some(role => userAuthorities.includes(role));
  }

}
