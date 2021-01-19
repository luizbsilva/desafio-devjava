import { Endereco } from "./endereco.model";

export class DadosEmpresaMatriz{
    codigo: number;
    nomeFantasia: string;
}

export class Empresa {
    codigo: number;
    documento: string;
    nomeFantasia: string;
    tipoEmpresa: string;
    razaoSocial: string;
    contato: string;
    email: string;
    endereco: Endereco;
    complemento: string;
    empresaMatriz: DadosEmpresaMatriz;

}