import { environment } from './../../../environments/environment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { MoneyHttp } from '../../seguranca/money-http';
import { Empresa } from './empresa.model';

export class EmpresaFiltro {
  nome: string;
  documento: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EmpresaService {

  empresassUrl: string;
  cepUrl: string;

  constructor(private http: MoneyHttp) {
    this.empresassUrl = `${environment.apiUrl}/empresas`;
    this.cepUrl = `${environment.apiUrl}/cep`;
  }

  pesquisar(filtro: EmpresaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.documento) {
      params = params.append('documento', filtro.documento);
    }

    return this.http.get<any>(`${this.empresassUrl}`, { params })
      .toPromise()
      .then(response => {
        const empresas = response.content;
        const resultado = {
          empresas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.empresassUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.empresassUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.empresassUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(empresa: Empresa): Promise<Empresa> {
    return this.http.post<Empresa>(this.empresassUrl, empresa)
      .toPromise();
  }

  atualizar(empresa: Empresa): Promise<Empresa> {
    return this.http.put<Empresa>(`${this.empresassUrl}/${empresa.codigo}`, empresa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Empresa> {
    return this.http.get<Empresa>(`${this.empresassUrl}/${codigo}`)
      .toPromise();
  }

  buscarCep(cep: any): Promise<any> {
    return this.http.get<any>(`${this.cepUrl}/${cep}`)
      .toPromise();
  }

  buscarEmpresaMatriz(): Promise<any> {
    return this.http.get<any>(`${this.empresassUrl}/buscar-empresa-matriz`)
      .toPromise();
  }

}