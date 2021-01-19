import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from '../../shared/shared.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaPesquisaComponent } from './empresa-pesquisa/empresa-pesquisa.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { InputMaskModule } from 'primeng/inputmask';




@NgModule({
    imports: [
      
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    FileUploadModule,
    ProgressSpinnerModule,

    SharedModule,
      EmpresaRoutingModule,
    ],
    declarations: [
      EmpresaPesquisaComponent,
      EmpresaCadastroComponent
    ],
    exports: []
  })
  export class EmpresaModule { }