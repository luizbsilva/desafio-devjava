package br.com.desafio.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CepEnderecoConsultaDTO {
    
    private String logradouro;
    
    private String localidade;
    
    private String uf;
    
    public CepEnderecoConsultaDTO() {}
    
    public CepEnderecoConsultaDTO(final String logradouro, final String localidade, final String uf) {
        this.logradouro = logradouro;
        this.localidade = localidade;
        this.uf = uf;
    }
    
}
