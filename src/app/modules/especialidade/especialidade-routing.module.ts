import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EspecialidadeListComponent} from "./especialidade-list/especialidade-list.component";
import {EspecialidadeFormComponent} from "./especialidade-form/especialidade-form.component";


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: EspecialidadeListComponent,
      },
      {
        path: ':id',
        component: EspecialidadeFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadeRoutingModule {
}
