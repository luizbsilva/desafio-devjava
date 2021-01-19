package br.com.desafio.repository.empresas;

import br.com.desafio.dto.EmpresaFilter;
import br.com.desafio.model.Empresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmpresaRepositoryQuery {

    Page<Empresa> filtrar(EmpresaFilter lancamentoFilter, Pageable pageable);
}
