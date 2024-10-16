import {Routes} from '@angular/router';
import {ChamadosListComponent} from "./chamados-list/chamados-list.component";
import {ChamadosFormComponent} from "./chamados-form/chamados-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: ChamadosListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.FUNCIONARIO, Role.GESTOR, Role.TECNICO]
    }
  },

  {
    path: ':id',
    component: ChamadosFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.FUNCIONARIO, Role.GESTOR, Role.TECNICO]
    }
  },
] as Routes;
