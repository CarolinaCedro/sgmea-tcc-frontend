import {Routes} from '@angular/router';
import {HistoricoListComponent} from "./historico-list/historico-list.component";
import {HistoricoFormComponent} from "./historico-form/historico-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: HistoricoListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.FUNCIONARIO, Role.GESTOR, Role.TECNICO]
    }
  },

  {
    path: ':id',
    component: HistoricoFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.FUNCIONARIO, Role.GESTOR, Role.TECNICO]
    }
  },
] as Routes;
