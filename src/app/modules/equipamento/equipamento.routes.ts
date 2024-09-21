import {Routes} from '@angular/router';
import {EquipamentoListComponent} from "./equipamento-list/equipamento-list.component";
import {EquipamentoFormComponent} from "./equipamento-form/equipamento-form.component";
import {RoleGuardService} from "../../core/roles/services/role-guard.service";
import {Role} from "../../core/roles/model/role";


export default [
  {
    path: '',
    component: EquipamentoListComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.FUNCIONARIO, Role.GESTOR]
    }
  },

  {
    path: ':id',
    component: EquipamentoFormComponent,
    canActivate: [RoleGuardService],
    data: {
      roles: [Role.FUNCIONARIO, Role.GESTOR]
    }
  },
] as Routes;
