import {Routes} from '@angular/router';
import {TecnicosListComponent} from "./tecnicos-list/tecnicos-list.component";
import {TecnicosFormComponent} from "./tecnicos-form/tecnicos-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: TecnicosListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.TECNICO, Role.GESTOR]
    }
  },

  {
    path: ':id',
    component: TecnicosFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.TECNICO, Role.GESTOR]
    }
  },
] as Routes;
