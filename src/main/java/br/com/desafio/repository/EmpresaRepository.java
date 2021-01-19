package br.com.desafio.repository;

import br.com.desafio.enums.TipoEmpresa;
import br.com.desafio.model.Empresa;
import br.com.desafio.repository.empresas.EmpresaRepositoryQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Long>, EmpresaRepositoryQuery {

    Page<Empresa> findByNomeFantasiaContaining(String nomeFantasia, Pageable pageable);

    List<Empresa> findByTipoEmpresa(TipoEmpresa tipoEmpresa);

}
