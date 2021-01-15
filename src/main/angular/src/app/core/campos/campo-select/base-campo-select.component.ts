import { SelectItem } from 'primeng/components/common/selectitem';
import { EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BaseCampoComponent } from '../base-campo.component';

export abstract class BaseCampoSelectComponent extends BaseCampoComponent {

  @Input() removerOpcaoVazia = true;

  @Input() options: SelectItem[];

  @Input() labelVazio = '';

  @Output() onChange = new EventEmitter<any>();

  @Input() filtro = false;

  valueReadonly = '';

  private denifirLabelCampo(): void {
    if (!this.ocultarLabel && (!this.label || this.label === '')) {
      this.label = this.getLabelDefault();
    }
  }

  private inicializarOpcoes(): void {
    if (!this.options) {
      this.options = [];
      this.options.push(...this.getOptionsDefault());
    }

    if (!this.removerOpcaoVazia && !this.options.some(item => item.label == '')) {
      this.options.unshift({ label: this.labelVazio, value: null });
    }
  }

  public inicializarValueReadonly(): void {
    let valorEscolhido: any;
    if (this.getOptionsDefault() != null) {
      valorEscolhido = this.getOptionsDefault().filter(option => option.value = this.model)[0];
    } else if (this.options != null) {
      valorEscolhido = this.options.filter(option => option.value = this.model)[0];
    }

    if (valorEscolhido) {
      this.valueReadonly = valorEscolhido.label;
    }
  }

  protected bindValueChange(): void {
    this.valueChangeSubscription = this.getInput().valueChanges.subscribe(value => {
      if (value === 'undefined') {
        this.getInput().setValue(undefined);
        this.onValueChange(null);
      } else {
        if (value !== this.ultimoValor) {
          this.ultimoValor = value;
          this.modelChange.emit(value);
          this.onValueChange(value);
        }
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.denifirLabelCampo();
    this.inicializarOpcoes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

   // if (changes['model'] && this.readonly) {
   //   this.inicializarValueReadonly();
   // }
  }

  public onValueChange(value: any): void {
    this.onChange.emit(this.getInput().value);
  }

  public abstract getLabelDefault(): string;
  public abstract getOptionsDefault(): SelectItem[];

}
