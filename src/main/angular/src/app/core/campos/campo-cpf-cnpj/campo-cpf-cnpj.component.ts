import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { BaseCampoComponent } from '../base-campo.component';
import { ValidatorsUtil } from '../validators-util';

@Component({
  selector: 'campo-cpf-cnpj',
  templateUrl: './campo-cpf-cnpj.component.html'
})
export class CampoCpfCnpjComponent extends BaseCampoComponent {

  @ViewChild('inputNativo') inputNativo: ElementRef;

  @Input() autocomplete: string = 'off';

  @Output() onInput: EventEmitter<string> = new EventEmitter<string>();

  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();

  @Output() onBlur: EventEmitter<string> = new EventEmitter<string>();

  private maskCpf = '000.000.000-00*';

  private maskCnpj = '00.000.000/0000-00';

  public get mask() {
    if (this.getInput().value && this.getInput().value.length > 11) {
      return this.maskCnpj;
    }
    return this.maskCpf;
  }

  public getCustomValidators(): any[] {
    return [ValidatorsUtil.cpfCnpjValidate];
  }

  public input(): void {
    this.onInput.emit(this.getInput().value);
  }

  public enter($event): void {
    this.onEnter.emit(this.getInput().value);
  }

  public blur(): void {
    this.onBlur.emit(this.getInput().value);
  }

  public focus(): void {
    //noinspection TypeScriptUnresolvedVariable
    this.inputNativo.nativeElement.focus();
  }

}
