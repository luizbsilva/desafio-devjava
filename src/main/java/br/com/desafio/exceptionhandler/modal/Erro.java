package br.com.desafio.exceptionhandler.modal;

import lombok.Getter;

@Getter
public class Erro {
    
    private final String mensagemUsuario;
    
    private final String mensagemDesenvolvedor;
    
    public Erro(final String mensagemUsuario, final String mensagemDesenvolvedor) {
        this.mensagemUsuario = mensagemUsuario;
        this.mensagemDesenvolvedor = mensagemDesenvolvedor;
    }

    
}
