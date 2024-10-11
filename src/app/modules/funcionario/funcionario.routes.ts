import {Routes} from '@angular/router';
import {FuncionarioListComponent} from "./funcionario-list/funcionario-list.component";
import {FuncionarioFormComponent} from "./funcionario-form/funcionario-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: FuncionarioListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [ Role.GESTOR]
    }

  },

  {
    path: ':id',
    component: FuncionarioFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [ Role.GESTOR]
    }
  },
] as Routes;
