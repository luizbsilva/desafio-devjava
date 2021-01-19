package br.com.desafio.repository.filter;

import br.com.desafio.model.Permissao;
import lombok.Getter;

@Getter
public class PermissaoFilter {

    private Long codigo;

    private String descricao;

    private Boolean selecionado;

    public PermissaoFilter() {
    }

    public PermissaoFilter(final Permissao permissao, final Boolean permissaoUltilizada) {
        this.codigo = permissao.getCodigo();
        this.descricao = permissao.getDescricao();
        this.selecionado = permissaoUltilizada;
    }

}
