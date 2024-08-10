import {Routes} from '@angular/router';
import {DepartamentoListComponent} from "./departamento-list/departamento-list.component";
import {DepartamentoFormComponent} from "./departamento-form/departamento-form.component";


export default [
  {
    path: '',
    component: DepartamentoListComponent,
  },

  {
    path: ':id',
    component: DepartamentoFormComponent,
  },
] as Routes;
