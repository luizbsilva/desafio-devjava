package br.com.desafio.enums;

public enum TipoEmpresa implements EnumConverter<Integer> {

    MATRIZ(1, "A+"),
    FILIAL(2, "A-");


    public final String descricao;

    private Integer codigo;

    TipoEmpresa(Integer codigo, String descricao) {
        this.descricao = descricao;
        this.codigo = codigo;

    }

    @Override
    public Integer getCodigo() {
        return this.codigo;
    }

    public final String getDescricao() {
        return this.descricao;
    }
}
