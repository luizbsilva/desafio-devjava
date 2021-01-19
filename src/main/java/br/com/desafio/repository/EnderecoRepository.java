package br.com.desafio.repository;

import br.com.desafio.model.Empresa;
import br.com.desafio.model.Endereco;
import br.com.desafio.repository.endereco.EnderecoRepositoryQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>, EnderecoRepositoryQuery {

}
