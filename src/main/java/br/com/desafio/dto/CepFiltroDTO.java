package br.com.desafio.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CepFiltroDTO {
    
    private String cep;
    
    private String logradouro;
    
    private String localidade;
    
    private String uf;
    
}
