export enum TipoEmpresa {
  MATRIZ = 'MATRIZ',
  FILIAL = 'FILIAL'
  }
  
  export namespace TipoEmpresa {
  
    export function getTipos(): TipoEmpresa[] {
      return [
        TipoEmpresa.MATRIZ,
        TipoEmpresa.FILIAL
      ];
    }
  
    export function getLabel(tipo: TipoEmpresa) {
      let label;
  
      switch (tipo) {
        case TipoEmpresa.MATRIZ:
          label = 'Matriz';
          break;
        case TipoEmpresa.FILIAL:
          label = 'Filial';
          break;
      }
  
      return label;
    }

  }
