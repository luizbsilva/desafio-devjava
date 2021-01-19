package br.com.desafio.model;

import br.com.desafio.util.Constantes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(schema = Constantes.SCHEMA_BANCO, name = "endereco")
public class Endereco extends EntidadeBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @Column(name = "end_logradouro", nullable = false)
    private String logradouro;

    @Column(name = "end_municipio", nullable = false)
    private String municipio;

    @Column(name = "end_bairro", nullable = false)
    private String bairro;

    @Column(name = "end_uf", nullable = false)
    private String estadoUF;

    @Column(name = "end_cep", nullable = false)
    private String cep;
}
