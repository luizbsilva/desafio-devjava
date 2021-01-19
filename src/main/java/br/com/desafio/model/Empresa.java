package br.com.desafio.model;

import br.com.desafio.enums.TipoEmpresa;
import br.com.desafio.util.Constantes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(schema = Constantes.SCHEMA_BANCO, name = "empresa")
public class Empresa extends EntidadeBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String razaoSocial;

    private String nomeFantasia;

    private String documento;

    @Enumerated(EnumType.STRING)
    private TipoEmpresa tipoEmpresa;

    @ManyToOne
    @JoinColumn(name = "codigo_endereco")
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "codigo_empresa")
    private Empresa empresaMatriz;

    private String contato;

    private String email;

    private String complemento;

    @NotNull
    private Boolean ativo;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.codigo == null) ? 0 : this.codigo.hashCode());
        return result;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (this.getClass() != obj.getClass()) {
            return false;
        }
        final Empresa other = (Empresa) obj;
        if (this.codigo == null) {
            if (other.codigo != null) {
                return false;
            }
        } else if (!this.codigo.equals(other.codigo)) {
            return false;
        }
        return true;
    }
}
