import { Component, Input } from '@angular/core';
import {SelectItem} from "primeng/api";
import { BaseCampoSelectComponent } from './base-campo-select.component';

@Component({
  selector: 'campo-select',
  templateUrl: './base-campo-select.component.html',
})
export class CampoSelectComponent extends BaseCampoSelectComponent {

  public getLabelDefault(): string {
    return 'Selecione';
  }

  public getOptionsDefault(): SelectItem[] {
    return null;
  }

}
