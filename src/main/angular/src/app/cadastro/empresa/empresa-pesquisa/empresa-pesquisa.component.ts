import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { EmpresaFiltro, EmpresaService } from '../empresa.service';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-empresa-pesquisa',
    templateUrl: './empresa-pesquisa.component.html',
    styleUrls: ['./empresa-pesquisa.component.css']
})
export class EmpresaPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new EmpresaFiltro();
    empresas = [];
    @ViewChild('tabela') grid;

    constructor(
        private empresaService: EmpresaService,
        private errorHandler: ErrorHandlerService,
        private confirmation: ConfirmationService,
        private messageService: MessageService,
        private title: Title
    ) { }

    ngOnInit() {
        this.title.setTitle('Pesquisa de Empresas');
    }

    pesquisar(pagina = 0) {
        this.filtro.pagina = pagina;

        this.empresaService.pesquisar(this.filtro)
            .then(resultado => {
                this.totalRegistros = resultado.total;
                this.empresas = resultado.pessoas;
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        this.pesquisar(pagina);
    }

    confirmarExclusao(pessoa: any) {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(pessoa);
            }
        });
    }

    excluir(pessoa: any) {
        this.empresaService.excluir(pessoa.codigo)
            .then(() => {
                if (this.grid.first === 0) {
                    this.pesquisar();
                } else {
                    this.grid.first = 0;
                }

                this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    alternarStatus(empresa: any): void {
        const novoStatus = !empresa.ativo;

        this.empresaService.mudarStatus(empresa.codigo, novoStatus)
            .then(() => {
                const acao = novoStatus ? 'ativada' : 'desativada';

                empresa.ativo = novoStatus;
                this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
            })
            .catch(erro => this.errorHandler.handle(erro));
    }
}
