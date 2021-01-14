package br.com.desafio.model;

import br.com.desafio.util.Constantes;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(schema = Constantes.SCHEMA_BANCO, name = "usuario_permissao")
public class PermissaoUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    
    @ManyToOne
    @JoinColumn(name = "codigo_permissao")
    private Permissao permissao;
    
    @ManyToOne
    @JoinColumn(name = "codigo_usuario")
    private Usuario usuario;
    
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
        final PermissaoUsuario other = (PermissaoUsuario) obj;
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
