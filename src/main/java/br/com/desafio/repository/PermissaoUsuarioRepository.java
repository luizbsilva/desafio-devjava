package br.com.desafio.repository;

import br.com.desafio.model.Permissao;
import br.com.desafio.model.PermissaoUsuario;
import br.com.desafio.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoUsuarioRepository extends JpaRepository<PermissaoUsuario, Long> {

    PermissaoUsuario findByPermissaoAndUsuario(final Permissao permissao, final Usuario usuario);

}
