package br.com.desafio.resource;

import br.com.desafio.dto.CepFiltroDTO;
import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.dto.EstadoCepDTO;
import br.com.desafio.dto.MunicipioCepDTO;
import br.com.desafio.service.CepService;
import br.com.desafio.util.CepException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cep")
public class CepResource {

    @Autowired
    private CepService cepViaCepService;

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public EnderecoDTO buscarEndereco(final CepFiltroDTO filtro, final BindingResult results) throws CepException {
        return this.cepViaCepService.buscarEndereco(filtro);
    }

    @GetMapping("/{codigo}")
    @PreAuthorize("isAuthenticated()")
    public EnderecoDTO buscarPorCep(@PathVariable final String codigo) throws CepException {
        return this.cepViaCepService.buscar(codigo);
    }

    @GetMapping("/estados")
    @PreAuthorize("isAuthenticated()")
    public EstadoCepDTO[] buscarListaDeEstados() throws CepException {
        return this.cepViaCepService.buscarListaDeEstados();
    }

    @GetMapping("/estado/municipios")
    @PreAuthorize("isAuthenticated()")
    public MunicipioCepDTO[] buscarListaDeMunicipiosPorEstado(final CepFiltroDTO filtro) throws CepException {
        return this.cepViaCepService.buscarListaDeMunicipiosPorEstado(filtro);
    }

    @GetMapping("/estado/municipios-por-logradouro")
    @PreAuthorize("isAuthenticated()")
    public EnderecoDTO[] buscarCepsPorLogradouro(final CepFiltroDTO filtro, final BindingResult results) throws CepException {
        return this.cepViaCepService.buscarCepsPorLogradouro(filtro);
    }
}
