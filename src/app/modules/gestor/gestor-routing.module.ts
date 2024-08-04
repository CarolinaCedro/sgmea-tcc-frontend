import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GestorListComponent} from "./gestor-list/gestor-list.component";
import {GestorFormComponent} from "./gestor-form/gestor-form.component";


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: GestorListComponent,
      },
      {
        path: ':id',
        component: GestorFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorRoutingModule {
}
