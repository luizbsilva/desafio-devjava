import {ActivatedRouteSnapshot} from "@angular/router";

export class Util {

  public static emailInvalido(email:string):boolean{
    //noinspection TypeScriptUnresolvedFunction
    return email && (email.endsWith('.') || email.indexOf('.') < 0 || email.endsWith('@') || email.indexOf('@') < 0);
  }

  public static getUrlFromActivatedRouteSnapshot(activatedRouteSnapshot:ActivatedRouteSnapshot):string{
    let url:string = `/${activatedRouteSnapshot.routeConfig.path}`;

    Object.keys(activatedRouteSnapshot.params).forEach(key => url = url.replace(`:${key}`, activatedRouteSnapshot.params[key]));

    return url;
  }

  public static openLinkInNewTab(url:string):void{
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public static downloadArquivo(blob:Blob, nomeArquivo:string):void{
    if (navigator.msSaveBlob){
      navigator.msSaveBlob(blob, nomeArquivo);

    } else {
      let link = document.createElement('a');
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', nomeArquivo);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  public static downloadArquivoBase64(base64:string, fileName:string):void{
    let byteString = window.atob(base64);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([int8Array], {});

    this.downloadArquivo(blob, fileName);
  }

  public static replaceParamsInRoute(params:{[key:string]:any}, route:string):string{
    Object.keys(params).forEach(key => route = route.replace(`:${key}`, params[key].toString()));
    return route;
  }

  public static replaceIndexFor(valor:string, newValue:string, start:number, end:number):string{
    let temp_1 = valor.substr(0, start);
    let temp_2 = valor.substr(end, valor.length);
    return temp_1 + newValue + temp_2;
  }

  public static replaceAll(valor:string, oldValue:string, newValue:string):string{
    while(valor.indexOf(oldValue) > 0){
      valor = valor.replace(oldValue, newValue);
    }

    return valor;
  }

  public static gerarUUID():string{
    let dt = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
  }

  public static substituirObjetoEmArrayPorIndex(objetos:any[], objeto:any):void{
    Util.substituirObjetoEmArrayPorAtributo(objetos, objeto, 'index');
  }

  public static substituirObjetoEmArrayPorId(objetos:any[], objeto:any):void{
    Util.substituirObjetoEmArrayPorAtributo(objetos, objeto, 'id');
  }

  private static substituirObjetoEmArrayPorAtributo(objetos:any[], objeto:any, atributo:string):void{
    let objetoNoArray = objetos.filter(temp => temp[atributo] === objeto[atributo])[0];
    if(objetoNoArray){
      let index = objetos.indexOf(objetoNoArray);
      objetos[index] = objeto;

    } else {
      throw new Error(`Falha ao substituir objeto em array por ${atributo}`);

    }
  }

  public static isCamposNaoPreenchidos(objeto:any, campos:string[]):boolean{
    let temCamposNaoPreenchidos;

    for (let campo of campos){

      temCamposNaoPreenchidos = Util.isCampoNaoPrenchido(objeto, campo);

      if(temCamposNaoPreenchidos){
        break;
      }
    }

    return temCamposNaoPreenchidos;
  }

  public static isCampoNaoPrenchido(objeto:any, campo:string):boolean{
    let isCampoNaoPreenvhido = objeto == undefined || objeto[campo] == undefined;

    if(!isCampoNaoPreenvhido){
      isCampoNaoPreenvhido = objeto[campo].toString().trim() === '';
    }

    return isCampoNaoPreenvhido;
  }

  public static isNullOrEmpty(objeto:any):boolean{
    if(objeto == null || objeto == undefined){
      return true;
    }
    return objeto.length === 0;
  }

}
