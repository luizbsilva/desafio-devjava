import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../seguranca/auth.guard';
import { EmpresaPesquisaComponent } from './empresa-pesquisa/empresa-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EMPRESA'] }
  },
  // {
  //   path: 'nova',
  // //  component: '',
  //   canActivate: [AuthGuard],
  //   data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  // },
  // {
  //   path: ':codigo',
  //   // component: '',
  //   canActivate: [AuthGuard],
  //   data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }