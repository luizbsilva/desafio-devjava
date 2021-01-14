package br.com.desafio.enums;

public enum TipoUsuario {
    
    ADMINISTRADOR("Administrador"),
    TECNICO("Técnico"),
    USUARIO("Solicitante");
    
    private final String descricao;
    
    TipoUsuario(final String descricao) {
        this.descricao = descricao;
    }
    
    public String getDescricao() {
        return this.descricao;
    }
}
