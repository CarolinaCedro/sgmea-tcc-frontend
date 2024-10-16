import {Routes} from '@angular/router';
import {ConsolidacaoListComponent} from "./consolidacao-list/consolidacao-list.component";
import {ConsolidacaoFormComponent} from "./consolidacao-form/consolidacao-form.component";
import {Role} from "../../core/roles/model/role";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";


export default [
  {
    path: '',
    component: ConsolidacaoListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.GESTOR, Role.TECNICO]
    }


  },

  {
    path: ':id',
    component: ConsolidacaoFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.GESTOR, Role.TECNICO]
    }

  },
] as Routes;
