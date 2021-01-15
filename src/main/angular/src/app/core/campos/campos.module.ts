import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CampoCpfCnpjComponent } from "./campo-cpf-cnpj/campo-cpf-cnpj.component";
import { CampoSelectComponent } from "./campo-select/campo-select";
import { CampoTextComponent } from './campo-text/campo-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    CampoCpfCnpjComponent,
    CampoTextComponent,
    CampoSelectComponent
  ],

  providers: [],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    CampoCpfCnpjComponent,
    CampoTextComponent,
    CampoSelectComponent
  ]
})
export class CamposModule {
}
