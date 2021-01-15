import {AbstractControl, ValidationErrors} from '@angular/forms';
import { Util } from '../util/util';

export class ValidatorsUtil {

  public static emailValidate(control: AbstractControl): ValidationErrors {
    let erro = null;

    if (Util.emailInvalido(control.value)) {
      erro = ValidatorsUtil.buildError('E-mail Inválido');
    }

    return erro;
  }

  public static tagValidate(control: AbstractControl): ValidationErrors {
    let erro = null;

    let regex = new RegExp('[\\$\\{\\}\\s\\s+]');
    if (regex.test(control.value)) {
      erro = ValidatorsUtil.buildError('Os caracteres não são permitidos: $ { } ou espaços');
    }

    return erro;
  }

  public static buildError(erro: string): ValidationErrors {
    return {
      invalido: {
        mensagem: erro
      }
    };
  }

  public static cpfValidate(control: AbstractControl): ValidationErrors {
    let erro = null;

    let cpf = control.value;

    if (cpf && cpf.length > 0) {
      cpf = cpf.replace(/[^\d]+/g, '');

      if (cpf.length != 11) {
        erro = {
          minlength: {
            requiredLength: 11
          }
        };
      } else if (ValidatorsUtil.isCpfInvalidos(cpf)
        || ValidatorsUtil.isDigitoCPFInvalido(cpf, 0)
        || ValidatorsUtil.isDigitoCPFInvalido(cpf, 1)) {
        erro = ValidatorsUtil.buildError('CPF inválido');
      }
    }

    return erro;
  }

  public static cpfCnpjValidate(control: AbstractControl): ValidationErrors {
    let erro = null;

    let cpfCnpj = control.value;

    if (cpfCnpj && cpfCnpj.length > 0) {
      cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');

      if (cpfCnpj.length < 11) {
        erro = {
          minlength: {
            requiredLength: 11
          }
        };
      } else if (cpfCnpj.length > 11 && cpfCnpj.length < 14) {
        erro = {
          minlength: {
            requiredLength: 14
          }
        };
      } else if (
        cpfCnpj.length === 11
        && (ValidatorsUtil.isCpfInvalidos(cpfCnpj)
        || ValidatorsUtil.isDigitoCPFInvalido(cpfCnpj, 0)
        || ValidatorsUtil.isDigitoCPFInvalido(cpfCnpj, 1))) {
        erro = ValidatorsUtil.buildError('CPF inválido');
      } else if (
        cpfCnpj.length === 14
        && (ValidatorsUtil.isCnpjInvalidos(cpfCnpj))) {
        erro = ValidatorsUtil.buildError('CNPJ inválido');
      }
    }

    return erro;
  }


  public static cepValidade(control: AbstractControl): ValidationErrors {
    let erro = null;

    let cep = control.value;

    if (cep && cep.length > 0) {
      cep = cep.replace(/[^\d]+/g, '');

      if (cep.length != 8) {
        erro = {
          minlength: {
            requiredLength: 8
          }
        };
      }
    }

    return erro;
  }


  public static telefoneValidade(control: AbstractControl): ValidationErrors {
    let erro = null;

    let telefone = control.value;
    if (telefone && telefone.length > 0) {
      telefone = telefone.replace(/[^\d]+/g, '');

      if (telefone.length < 10) {
        erro = {
          minlength: {
            requiredLength: 10
          }
        };
      }
    }


    return erro;
  }

  private static isCpfInvalidos(cpf: string): boolean {
    return cpf === '00000000000'
      || cpf === '11111111111'
      || cpf === '22222222222'
      || cpf === '33333333333'
      || cpf === '44444444444'
      || cpf === '55555555555'
      || cpf === '66666666666'
      || cpf === '77777777777'
      || cpf === '88888888888'
      || cpf === '99999999999';
  }

  private static isCnpjInvalidos(cpf: string): boolean {
    return cpf === '00000000000000'
      || cpf === '11111111111111'
      || cpf === '22222222222222'
      || cpf === '33333333333333'
      || cpf === '44444444444444'
      || cpf === '55555555555555'
      || cpf === '66666666666666'
      || cpf === '77777777777777'
      || cpf === '88888888888888'
      || cpf === '99999999999999';
  }

  private static isDigitoCPFInvalido(cpf, digito: number): boolean {
    let charIndex_1 = 9 + digito;
    let charIndex_2 = 10 + digito;

    let add = 0;
    for (let index = 0; index < charIndex_1; index++) {
      add += parseInt(cpf.charAt(index)) * (charIndex_2 - index);
    }

    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    return rev != parseInt(cpf.charAt(charIndex_1));
  }
}
