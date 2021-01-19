package br.com.desafio.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class EnderecoDTO {

    private Long codigo;

    @NotNull(message = "CEP é obrigatório")
    private String cep;

    @NotNull(message = "Logradpuro é obrigatório")
    @Size(min = 2, max = 40, message
            = "O Logradouro deve conter no maximo de 40 caracteres")
    private String logradouro;

    @NotNull(message = "bairro é obrigatório")
    @Size(min = 2, max = 40, message
            = "O bairro deve conter no maximo de 40 caracteres")
    private String bairro;

    @NotNull(message = "Cidade é obrigatório")
    @Size(min = 2, max = 40, message
            = "O Municipio deve conter no maximo de 40 caracteres")
    private String localidade;

    @NotNull(message = "UF é obrigatório")
    @Size(min = 2, max = 40, message
            = "Uf deve conter no maximo de 40 caracteres")
    private String uf;

    private boolean erro;
}
