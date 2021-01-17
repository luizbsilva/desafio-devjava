package br.com.desafio.repository;

import br.com.desafio.model.Empresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Page<Empresa> findByNomeFantasiaContaining(String nomeFantasia, Pageable pageable);

}
