import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../../shared/shared.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaPesquisaComponent } from './empresa-pesquisa/empresa-pesquisa.component';



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
  
      InputTextModule,
      ButtonModule,
      TableModule,
      TooltipModule,
      InputMaskModule,
      PanelModule,
      DialogModule,
      DropdownModule,
      CurrencyMaskModule,
  
      SharedModule,
      EmpresaRoutingModule,
    ],
    declarations: [
      EmpresaPesquisaComponent
    ],
    exports: []
  })
  export class EmpresaModule { }