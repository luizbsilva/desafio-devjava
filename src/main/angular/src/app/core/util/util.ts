import {ActivatedRouteSnapshot} from "@angular/router";

export class Util {

  public static emailInvalido(email:string):boolean{
    //noinspection TypeScriptUnresolvedFunction
    return email && (email.endsWith('.') || email.indexOf('.') < 0 || email.endsWith('@') || email.indexOf('@') < 0);
  }

}
