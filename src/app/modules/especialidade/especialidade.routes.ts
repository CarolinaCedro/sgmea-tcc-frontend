import {Routes} from '@angular/router';
import {EspecialidadeListComponent} from "./especialidade-list/especialidade-list.component";
import {EspecialidadeFormComponent} from "./especialidade-form/especialidade-form.component";


export default [
  {
    path: '',
    component: EspecialidadeListComponent,
  },

  {
    path: ':id',
    component: EspecialidadeFormComponent,
  },
] as Routes;
