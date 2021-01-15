import {EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import { ReactiveFormsUtil } from "../util/reactive-forms-util";

export abstract class BaseCampoComponent implements OnInit, OnChanges, OnDestroy {

  readonly classTamanhoInput:string = 'form-control-sm';

  @Input() formGroup:FormGroup;

  @Input() ocultarLabel:boolean = false;
  @Input() readonly:boolean = false;
  @Input() required:boolean = false;
  @Input() labelNoCampo:boolean = false;

  @Input() inputId:string;
  @Input() name:string;
  @Input() label:string = '';
  @Input() styleClass: string = '';
  @Input() classContainer: string;
  @Input() classInputGroup: string;
  @Input() classLabel: string;

  @Input() model:any;
  @Output() modelChange = new EventEmitter<any>();

  valueChangeSubscription:Subscription;
  ultimoValor:any;
  dataKey:string;

  private unBindValueChange():void{
    if(this.valueChangeSubscription){
      this.valueChangeSubscription.unsubscribe();
    }
  }

  private setCustomValidators():void{
    let customValidators:any[] = this.getCustomValidators();
    if(customValidators.length > 0){
      this.getInput().setValidators(customValidators);
    }
  }

  private inicializarId():void{
    if(this.inputId == undefined){
      this.inputId = this.name;
    }
  }

  ngOnInit():void{
    this.inicializarDataKay();
    this.setCustomValidators();
    this.inicializarId();
    this.bindValueChange();
  }

  ngOnDestroy():void{
    this.unBindValueChange();
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['model']){
      this.setarValorDoModel();
    }

    if(changes['readonly']){
      ReactiveFormsUtil.disable(this.getInput(), this.readonly);
    }
  };

  protected inicializarDataKay():void{
    this.dataKey = 'id';
  }

  protected bindValueChange():void{
    this.valueChangeSubscription = this.getInput().valueChanges.subscribe(value => {
      if(value != this.ultimoValor){
        value = value === undefined ? null : value;
        this.ultimoValor = value;
        this.modelChange.emit(value);
        this.onValueChange(value);
      }
    });
  }

  protected setarValorDoModel():void{
    if(this.model != this.getInput().value){
      this.ultimoValor = this.model;
      this.getInput().setValue(this.model);
    }
  }

  protected getInput(name:string = this.name):AbstractControl{
    return ReactiveFormsUtil.getFormControl(this.formGroup, name);
  }

  public getValue():any{
    return this.getInput().value;
  }

  public setValue(value:any):void{
    this.getInput().setValue(value);
  }

  public valid():boolean{
    return this.getInput().valid;
  }

  public focus():void{
    console.warn(`${this.constructor.name}: Função focus não implementanda.`);
  }

  protected getCustomValidators():any[]{
    return [];
  }

  public onValueChange(value:any):void{}
}
