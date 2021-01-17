package br.com.desafio.service;

import br.com.desafio.dto.EmpresaDTO;
import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.model.Empresa;
import br.com.desafio.model.Endereco;
import br.com.desafio.repository.EmpresaRepository;
import br.com.desafio.repository.EnderecoRepository;
import br.com.desafio.repository.EnderecoRepositoryQuery;
import br.com.desafio.util.StringUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private EnderecoRepositoryQuery enderecoRepositoryQuery;

    public Endereco validarEndereco(final EnderecoDTO filtro) {
        final Endereco endereco = this.enderecoRepositoryQuery.buscarEndereco(filtro);

        return (Objects.isNull(endereco)) ? this.salvarNovoEndereco(filtro) : endereco;

    }

    private Endereco salvarNovoEndereco(final EnderecoDTO filtro) {
        final Endereco endereco = new Endereco();

        endereco.setLogradouro(filtro.getLogradouro());
        endereco.setMunicipio(filtro.getLocalidade());
        endereco.setBairro(filtro.getBairro());
        endereco.setEstadoUF(filtro.getUf());
        endereco.setCep(StringUtil.removeCaracteresDeNumeros(filtro.getCep()));

        this.enderecoRepository.save(endereco);
        this.enderecoRepository.flush();

        return endereco;
    }

}
