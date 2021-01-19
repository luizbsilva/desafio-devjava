package br.com.desafio.service;

import br.com.desafio.dto.EmpresaDTO;
import br.com.desafio.dto.EmpresaFilter;
import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.enums.TipoEmpresa;
import br.com.desafio.model.Empresa;
import br.com.desafio.model.Endereco;
import br.com.desafio.repository.EmpresaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    private static final Logger log = LoggerFactory.getLogger(EmpresaService.class);

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EnderecoService enderecoService;

    public Empresa salvar(final EmpresaDTO empresaDTO) {
        return this.empresaRepository.save(preencherDadosEmpresa(empresaDTO));
    }


    private Empresa preencherDadosEmpresa(EmpresaDTO empresaDTO) {
        Empresa empresa = new Empresa();
        empresaDTO.preencher(empresa);
        empresa.setAtivo(Boolean.TRUE);
        preencherEntidade(empresaDTO, empresa);
        return empresa;
    }

    private Endereco preencherEndereco(EnderecoDTO enderecoDTO) {
        return enderecoService.validarEndereco(enderecoDTO);
    }

    public Empresa atualizar(final Long codigo, final EmpresaDTO empresaDTO) {
        final Empresa empresaSalva = this.buscarEmpresaPeloCodigo(codigo);
        empresaDTO.preencher(empresaSalva);
        preencherEntidade(empresaDTO, empresaSalva);
        if (empresaSalva.getTipoEmpresa().equals(TipoEmpresa.MATRIZ)){
            empresaSalva.setEmpresaMatriz(null);
        }

        return this.empresaRepository.save(empresaSalva);
    }

    private void preencherEntidade(EmpresaDTO empresaDTO, Empresa empresa) {
        empresa.setEndereco(preencherEndereco(empresaDTO.getEndereco()));
        if (TipoEmpresa.FILIAL.equals(empresa.getTipoEmpresa())) {
            Optional<Empresa> empresaMatriz = empresaRepository.findById(empresaDTO.getEmpresaMatriz().getCodigo());
            if (!empresaMatriz.isPresent()) {
                throw new EmptyResultDataAccessException(1);
            }
            empresa.setEmpresaMatriz(empresaMatriz.get());
        }
    }

    public void atualizarPropriedadeAtivo(final Long codigo, final Boolean ativo) {
        final Empresa EmpresaSalva = this.buscarEmpresaPeloCodigo(codigo);
        EmpresaSalva.setAtivo(ativo);
        this.empresaRepository.save(EmpresaSalva);
    }

    public Empresa buscarEmpresaPeloCodigo(final Long codigo) {
        final Optional<Empresa> EmpresaSalva = this.empresaRepository.findById(codigo);
        if (!EmpresaSalva.isPresent()) {
            throw new EmptyResultDataAccessException(1);
        }
        return EmpresaSalva.get();
    }

    public List<Empresa> buscarEmpresasMatriz() {
        return empresaRepository.findByTipoEmpresa(TipoEmpresa.MATRIZ);
    }

    @Cacheable(value = "squareCache", key = "#empresaFilter")
    public Page<Empresa> filtrar(EmpresaFilter empresaFilter, Pageable pageable) {
        return empresaRepository.filtrar(empresaFilter, pageable);
    }
}
