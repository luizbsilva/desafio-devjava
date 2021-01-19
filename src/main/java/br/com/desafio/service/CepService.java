package br.com.desafio.service;

import br.com.desafio.dto.CepFiltroDTO;
import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.dto.EstadoCepDTO;
import br.com.desafio.dto.MunicipioCepDTO;
import br.com.desafio.util.CepException;
import br.com.desafio.util.ServiceApiExternaBase;
import org.springframework.stereotype.Service;

import org.json.JSONException;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class CepService extends ServiceApiExternaBase {

    private static final String URL_VIACEP_BASE = "http://viacep.com.br/ws/";

    private static final String URL_IBGE_BASE = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/";

    public EnderecoDTO buscarEndereco(final CepFiltroDTO filtro) throws CepException {
        if (!filtro.getCep().isEmpty()) {
            return this.buscar(filtro.getCep());
        }

        return new EnderecoDTO();
    }

    public EnderecoDTO buscar(final String cep) throws CepException {
        final String url = URL_VIACEP_BASE + cep + "/json/";
        try {
            return this.getObject(EnderecoDTO.class, this.get(url));
        } catch (JSONException | IOException e) {
            throw new CepException(cep, e);
        }
    }

    public EnderecoDTO[] buscarCepsPorLogradouro(final CepFiltroDTO filtro) throws CepException {

        try {

            final String localidade = URLEncoder.encode(filtro.getLocalidade(), StandardCharsets.UTF_8.toString());
            final String logradouro = URLEncoder.encode(filtro.getLogradouro(), StandardCharsets.UTF_8.toString());

            final String url = URL_VIACEP_BASE + filtro.getUf() + "/" + localidade + "/" + logradouro + "/json/";

            return this.getObject(EnderecoDTO[].class, this.get(url));

        } catch (JSONException | IOException e) {
            throw new CepException(e);
        }
    }

    public EstadoCepDTO[] buscarListaDeEstados() throws CepException {
        final String url = URL_IBGE_BASE;
        try {
            return this.getObject(EstadoCepDTO[].class, this.get(url));
        } catch (JSONException | IOException e) {
            throw new CepException(e);
        }
    }

    public MunicipioCepDTO[] buscarListaDeMunicipiosPorEstado(final CepFiltroDTO filtro) throws CepException {
        final String url = URL_IBGE_BASE + filtro.getUf() + "/municipios/";
        try {
            return this.getObject(MunicipioCepDTO[].class, this.get(url));
        } catch (JSONException | IOException e) {
            throw new CepException(e);
        }
    }
}
