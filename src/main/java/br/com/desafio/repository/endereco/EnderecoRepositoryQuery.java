package br.com.desafio.repository.endereco;

import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.model.Endereco;

public interface EnderecoRepositoryQuery {

    Endereco buscarEndereco(final EnderecoDTO filtro);
}
