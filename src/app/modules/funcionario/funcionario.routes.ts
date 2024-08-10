import {Routes} from '@angular/router';
import {FuncionarioListComponent} from "./funcionario-list/funcionario-list.component";
import {FuncionarioFormComponent} from "./funcionario-form/funcionario-form.component";


export default [
  {
    path: '',
    component: FuncionarioListComponent,
  },

  {
    path: ':id',
    component: FuncionarioFormComponent,
  },
] as Routes;
