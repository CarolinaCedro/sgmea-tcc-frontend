import {Routes} from '@angular/router';
import {DepartamentoListComponent} from "./departamento-list/departamento-list.component";
import {DepartamentoFormComponent} from "./departamento-form/departamento-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: DepartamentoListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.GESTOR]
    }
  },

  {
    path: ':id',
    component: DepartamentoFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.GESTOR]
    }
  },
] as Routes;
