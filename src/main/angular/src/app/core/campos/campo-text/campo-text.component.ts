import {Component, Input, Output, EventEmitter, ViewChild, ElementRef} from "@angular/core";
import { BaseCampoComponent } from '../base-campo.component';

@Component({
  selector: 'campo-text',
  templateUrl: './campo-text.component.html'
})
export class CampoTextComponent extends BaseCampoComponent {

  @ViewChild('inputNativo') inputNativo:ElementRef;

  @Input() maxlength = 250;

  @Input() autocomplete:string = 'off';

  @Input() placeholder:string = '';

  @Output() onBlur:EventEmitter<string> = new EventEmitter<string>();

  @Output() onInput:EventEmitter<string> = new EventEmitter<string>();

  @Output() onEnter:EventEmitter<void> = new EventEmitter<void>();

  public input():void{
    this.onInput.emit(this.getInput().value);
  }

  public blur():void{
    this.onBlur.emit(this.getInput().value);
  }

  public enter():void{
    this.onEnter.emit();
  }

  public focus():void{
    //noinspection TypeScriptUnresolvedVariable
    this.inputNativo.nativeElement.focus();
  }
}
