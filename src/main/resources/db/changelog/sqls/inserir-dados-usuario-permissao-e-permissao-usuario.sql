ALTER TABLE cademp.permissao RENAME COLUMN nome TO descricao;

INSERT INTO cademp.usuario (nome, email, senha) values ('Administrador', 'admin@desafio.com.br', '$2a$10$WVXalf9apAtO/CDiAkgBz.kS9faeHtz4fs5BrXWN9vZgX2xf77Oom');

INSERT INTO cademp.permissao (codigo, descricao) values (1, 'ROLE_CADASTRAR_EMPRESA');
INSERT INTO cademp.permissao (codigo, descricao) values (2, 'ROLE_REMOVER_EMPRESA');
INSERT INTO cademp.permissao (codigo, descricao) values (3, 'ROLE_PESQUISAR_EMPRESA');

-- admin
INSERT INTO cademp.usuario_permissao (codigo_usuario, codigo_permissao) values (1, 1);
INSERT INTO cademp.usuario_permissao (codigo_usuario, codigo_permissao) values (1, 2);
INSERT INTO cademp.usuario_permissao (codigo_usuario, codigo_permissao) values (1, 3);