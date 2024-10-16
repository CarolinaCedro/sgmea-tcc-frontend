import {Routes} from '@angular/router';
import {GestorListComponent} from "./gestor-list/gestor-list.component";
import {GestorFormComponent} from "./gestor-form/gestor-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: GestorListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.GESTOR]
    }

  },

  {
    path: ':id',
    component: GestorFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.GESTOR]
    }
  },
] as Routes;
