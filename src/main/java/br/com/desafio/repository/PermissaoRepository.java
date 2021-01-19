package br.com.desafio.repository;

import br.com.desafio.model.Permissao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

    Page<Permissao> findByDescricaoContaining(String nome, Pageable pageable);

}
