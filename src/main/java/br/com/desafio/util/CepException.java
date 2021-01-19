package br.com.desafio.util;


import br.com.desafio.dto.CepEnderecoConsultaDTO;

public class CepException extends Exception {
    
    private static final long serialVersionUID = 6568466069232950966L;
    
    private String cep;
    
    private CepEnderecoConsultaDTO endereco;
    
    public CepException(final Throwable throwable) {
        super(throwable);
    }
    
    public CepException(final String cep, final Throwable throwable) {
        super(throwable);
        this.cep = cep;
    }
    
    public CepException(final CepEnderecoConsultaDTO endereco, final Throwable throwable) {
        super(throwable);
        this.endereco = endereco;
    }
    
    public String getCep() {
        return this.cep;
    }
    
    public CepEnderecoConsultaDTO getEndereco() {
        return this.endereco;
    }
    
}
