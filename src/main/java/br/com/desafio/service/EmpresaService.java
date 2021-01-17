package br.com.desafio.service;

import br.com.desafio.dto.EmpresaDTO;
import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.model.Empresa;
import br.com.desafio.model.Endereco;
import br.com.desafio.repository.EmpresaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmpresaService {


    @Autowired
    private EmpresaRepository EmpresaRepository;

    @Autowired
    private EnderecoService enderecoService;

    public Empresa salvar(final EmpresaDTO empresaDTO) {
        return this.EmpresaRepository.save(preencherDadosEmpresa(empresaDTO));
    }


    private Empresa preencherDadosEmpresa(EmpresaDTO empresaDTO) {
        Empresa empresa = new Empresa();
        empresa.setDocumento(empresaDTO.getDocumento());
        empresa.setNomeFantasia(empresaDTO.getNomeFantasia());
        empresa.setTipoEmpresa(empresaDTO.getTipoEmpresa());
        empresa.setRazaoSocial(empresaDTO.getRazaoSocial());
        empresa.setContato(empresaDTO.getContato());
        empresa.setComplemento(empresaDTO.getComplemento());
        empresa.setEmail(empresaDTO.getEmail());
        empresa.setEndereco(preencherEndereco(empresaDTO.getEnderecoDTO()));


        return empresa;
    }

    private Endereco preencherEndereco(EnderecoDTO enderecoDTO) {
        return enderecoService.validarEndereco(enderecoDTO);
    }

    public Empresa atualizar(final Long codigo, final Empresa Empresa) {
        final Empresa EmpresaSalva = this.buscarEmpresaPeloCodigo(codigo);

        BeanUtils.copyProperties(Empresa, EmpresaSalva, "codigo", "contatos");
        return this.EmpresaRepository.save(EmpresaSalva);
    }

    public void atualizarPropriedadeAtivo(final Long codigo, final Boolean ativo) {
        final Empresa EmpresaSalva = this.buscarEmpresaPeloCodigo(codigo);
        EmpresaSalva.setAtivo(ativo);
        this.EmpresaRepository.save(EmpresaSalva);
    }

    public Empresa buscarEmpresaPeloCodigo(final Long codigo) {
        final Optional<Empresa> EmpresaSalva = this.EmpresaRepository.findById(codigo);
        if (!EmpresaSalva.isPresent()) {
            throw new EmptyResultDataAccessException(1);
        }
        return EmpresaSalva.get();
    }
}
