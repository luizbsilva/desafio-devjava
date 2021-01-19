import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../seguranca/auth.guard';
import { EmpresaPesquisaComponent } from './empresa-pesquisa/empresa-pesquisa.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_EMPRESA'] }
  },
  {
    path: 'nova',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EMPRESA'] }
  },
  {
    path: ':codigo',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_EMPRESA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }