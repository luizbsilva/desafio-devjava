import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { EmpresaService } from '../empresa.service';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { DadosEmpresaMatriz, Empresa } from '../empresa.model';
import { TipoEmpresa } from '../../../core/enums/tipo-empresa.enum';
import { Endereco } from '../endereco.model';
import { ValidatorsUtil } from '../../../core/util/validators-util';


@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent implements OnInit {

  tipos = [];
  empresas = [];
  empresa = new Empresa();
  formulario: FormGroup;

  constructor(
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoEmpresa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Empresa');

    if (codigoEmpresa) {
      this.carregarEmpresas(codigoEmpresa);
    }
    this.carregarTipoEmpresas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipoEmpresa: ['', Validators.required],
      documento: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(11), this.validarDocumento]],
      nomeFantasia: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      razaoSocial: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      empresaMatriz: this.formBuilder.group({
        codigo: [],
        nomeFantasia: []
      }),
      contato: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      email: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5), this.validarEmail]],
      cep: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(8)]],
      logradouro: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      bairro: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      localidade: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      uf: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(2)]],
      complemento: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  validarDocumento(input: FormControl) {
    return (input.value ? null : { documentoValido: ValidatorsUtil.cpfCnpjValidate });
  }

  validarEmail(input: FormControl) {
    return (input.value ? null : { emailValidado: ValidatorsUtil.emailValidate });
  }
  

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarEmpresas(codigo: number) {
    this.empresaService.buscarPorCodigo(codigo)
      .then(empresa => {
        this.carregarDadosEmpresa(empresa);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarDadosEmpresa(empresa) {
    this.formulario.get('codigo').setValue(empresa.codigo);
    this.formulario.get('tipoEmpresa').setValue(empresa.tipoEmpresa);
    this.formulario.get('documento').setValue(empresa.documento);
    this.formulario.get('nomeFantasia').setValue(empresa.nomeFantasia);
    this.formulario.get('razaoSocial').setValue(empresa.razaoSocial);
    this.formulario.get('contato').setValue(empresa.contato);
    this.formulario.get('email').setValue(empresa.email);
    this.formulario.get('complemento').setValue(empresa.complemento);

    if (empresa.empresaMatriz) {
      this.formulario.patchValue({
        empresaMatriz: {
          codigo: empresa.empresaMatriz.codigo
        }
      });

      const tipoEmpresa = empresa.tipoEmpresa;
      const isEmpresaFlilial = tipoEmpresa == TipoEmpresa.FILIAL;
      if (isEmpresaFlilial) {
        this.carregarEmpresaMatriz();
      }
    }

    this.preencherFormualrio(empresa.endereco);

  }

  salvar() {
    if (this.editando) {
      this.atualizarEmpresa();
    } else {
      this.adicionarEmpresa();
    }
  }

  adicionarEmpresa() {
    const tipoEmpresa = this.formulario.get('tipoEmpresa').value;
    const codigoEmpresaMatriz = this.formulario.get('empresaMatriz.codigo').value;
    const isEmpresaFlilial = tipoEmpresa == TipoEmpresa.FILIAL;

    if (isEmpresaFlilial && codigoEmpresaMatriz == null) {
      this.messageService.add({ severity: 'error', detail: 'Inserir a Empresa Matriz!' });
    } else {
      this.preencherEmpresa(this.formulario.value);
      this.empresaService.adicionar(this.empresa)
        .then(empresaAdicionado => {
          this.messageService.add({ severity: 'success', detail: 'Empresa adicionado com sucesso!' });
          this.router.navigate(['/empresas', empresaAdicionado.codigo]);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }


  }

  atualizarEmpresa() {
    const tipoEmpresa = this.formulario.get('tipoEmpresa').value;
    const codigoEmpresaMatriz = this.formulario.get('empresaMatriz.codigo').value;
    const isEmpresaFlilial = tipoEmpresa == TipoEmpresa.FILIAL;

    if (isEmpresaFlilial && codigoEmpresaMatriz == null) {
      this.messageService.add({ severity: 'error', detail: 'Inserir a Empresa Matriz!' });
    } else {
      this.preencherEmpresa(this.formulario.value);
      this.empresaService.atualizar(this.empresa)
        .then(empresa => {
          this.carregarDadosEmpresa(empresa);
  
          this.messageService.add({ severity: 'success', detail: 'Empresa alterada com sucesso!' });
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
    
  }

  carregarTipoEmpresas() {
    this.tipos = TipoEmpresa.getTipos().map(item => {
      return { label: TipoEmpresa.getLabel(item), value: item };
    });
  }

  novo() {
    this.formulario.reset();

    setTimeout(function () {
      this.empresa = new Empresa();
    }.bind(this), 1);

    this.router.navigate(['/empresas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de empresa: ${this.formulario.get('nomeFantasia').value}`);
  }

  buscarCep() {
    var resultado = this.formulario.get('cep').value.replace(".", "").replace("-", "");

    this.empresaService.buscarCep(resultado)
      .then(endereco => {
        this.formulario.patchValue({
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          localidade: endereco.localidade,
          uf: endereco.uf
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  preencherEmpresa(formulario: any) {
    this.empresa.codigo = formulario.codigo;
    this.empresa.tipoEmpresa = formulario.tipoEmpresa;
    this.empresa.documento = formulario.documento;
    this.empresa.nomeFantasia = formulario.nomeFantasia;
    this.empresa.razaoSocial = formulario.razaoSocial;
    this.empresa.contato = formulario.contato;
    this.empresa.email = formulario.email;


    const tipoEmpresa = this.formulario.get('tipoEmpresa').value;
    const isEmpresaFlilial = tipoEmpresa == TipoEmpresa.FILIAL;

    if(isEmpresaFlilial){
      let empresaMatriz = new DadosEmpresaMatriz();
      empresaMatriz.codigo = formulario.empresaMatriz.codigo;
      this.empresa.empresaMatriz = empresaMatriz;
    }

    let endereco = new Endereco();
    endereco.cep = formulario.cep;
    endereco.logradouro = formulario.logradouro;
    endereco.bairro = formulario.bairro;
    endereco.localidade = formulario.localidade;
    endereco.uf = formulario.uf;
    this.empresa.endereco = endereco;

    this.empresa.complemento = formulario.complemento;
  }


  preencherFormualrio(endereco: any) {
    this.formulario.get('cep').setValue(endereco.cep);
    this.formulario.get('bairro').setValue(endereco.bairro);
    this.formulario.get('uf').setValue(endereco.estadoUF);
    this.formulario.get('logradouro').setValue(endereco.logradouro);
    this.formulario.get('localidade').setValue(endereco.municipio);
  }

  empresaMatriz(event) {
    const tipoEmpresa = event.value;
    const isEmpresaFlilial = tipoEmpresa == TipoEmpresa.FILIAL;
    if (isEmpresaFlilial) {
      this.carregarEmpresaMatriz();
    }
  }

  carregarEmpresaMatriz() {
    this.empresaService.buscarEmpresaMatriz()
      .then(empresasList => {
        this.empresas = empresasList
          .map(p => ({ label: p.nomeFantasia, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
