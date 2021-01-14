UPDATE cademp.usuario SET ativo = true, tipo_usuario = 'ADMINISTRADOR' WHERE codigo = 1;
 
ALTER TABLE cademp.usuario ALTER COLUMN tipo_usuario SET NOT NULL;
ALTER TABLE cademp.usuario ALTER COLUMN ativo SET NOT NULL;