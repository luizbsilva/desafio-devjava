import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

export class ReactiveFormsUtil {

  public static getFormControl(formGroup: FormGroup, name: string): FormControl {
    let formControl;

    try{
      formControl = <FormControl>formGroup.get(name);

      if (!formControl) {
        console.error(formGroup);
        throw new Error(`Não foi possível encontrar o formControl de ${name}`);
      }

    }catch (e) {
      console.error(formGroup);
      throw new Error(`Não foi possível encontrar o formControl de ${name}`);
    }

    return formControl;
  }

  public static disable(control: AbstractControl, disabled: boolean): void {
    if (disabled && control.enabled) {
      control.disable();

    } else if (!disabled && control.disabled) {
      control.enable();

    }
  }

  public static isControlsNotDisabledValid(abstractControl: AbstractControl): boolean {
    let isValid = true;

    let controls = abstractControl['controls'];

    if (controls) {
      let controlsKey: string[] = Object.keys(controls);

      for (let index = 0; index < controlsKey.length; index++) {
        let controlTemp: AbstractControl = controls[controlsKey[index]];

        if (controlTemp instanceof FormGroup) {
          isValid = ReactiveFormsUtil.isControlsNotDisabledValid(controlTemp);

        } else if (!controlTemp.disabled) {
          isValid = controlTemp.valid;

        }

        if (!isValid) {
          break;
        }
      }
    }

    return isValid;
  }

  public static limparControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(controlName => formGroup.get(controlName).setValue(null));
  }

  public static limparControlsExceto(formGroup: FormGroup, controlNamesPermanecentes: string[]): void {
    Object.keys(formGroup.controls)
      .filter(controlName => controlNamesPermanecentes.findIndex(c => c === controlName) === -1)
      .forEach(controlName => formGroup.get(controlName).setValue(null));
  }

  public static copiarControls(de: FormGroup, para: FormGroup): void {
    Object.keys(de.controls).forEach(controlName => {
      try {
        para.get(controlName).setValue(de.get(controlName).value)
      } catch (e) {
        console.log('O formControl ' + controlName + ' do formGroup referente a variavel (de) não foi encontrado no formGroup (para)');
      }
    });
  }

  public static removeValidators(control: AbstractControl): void {
    control.clearValidators();
    control.updateValueAndValidity();
  }

  public static setValidators(control: AbstractControl, newValidator: ValidatorFn | ValidatorFn[] | null): void {
    control.setValidators(newValidator);
    control.updateValueAndValidity();
  }

  public static existeControlsComValor(formGroup: FormGroup): boolean {
    let existeDadosNoFormGroup = false;

    for (let key of Object.keys(formGroup.controls)) {
      let abstractControl = formGroup.get(key);

      if (abstractControl instanceof FormGroup) {
        existeDadosNoFormGroup = ReactiveFormsUtil.existeControlsComValor(abstractControl);

      } else {
        let value = abstractControl.value;
        if(Array.isArray(value)){
          existeDadosNoFormGroup = value.length > 0;

        } else {
          existeDadosNoFormGroup = value && value != 'undefined' && value.toString().length > 0;
        }

      }

      if (existeDadosNoFormGroup) {
        break;
      }
    }

    return existeDadosNoFormGroup;
  }

  public static todosControlsComValor(formGroup: FormGroup): boolean {
    let todosControlsComValor = true;

    for (let key of Object.keys(formGroup.controls)) {
      let abstractControl = formGroup.get(key);

      if (abstractControl instanceof FormGroup) {
        todosControlsComValor = ReactiveFormsUtil.todosControlsComValor(abstractControl);

      } else if (abstractControl.value == undefined || abstractControl.value == 'undefined' || abstractControl.value.toString().length === 0) {
        todosControlsComValor = false;
        break;

      }

    }

    return todosControlsComValor;
  }

}
