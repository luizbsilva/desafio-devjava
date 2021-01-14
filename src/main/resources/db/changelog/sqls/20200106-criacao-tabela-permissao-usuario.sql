CREATE TABLE cademp.usuario_permissao (
	codigo BIGINT NOT NULL,
	codigo_usuario BIGINT NOT NULL,
	codigo_permissao BIGINT NOT NULL,	
    CONSTRAINT unique_usuario_permissao_codigo UNIQUE( codigo )) ; 
    
ALTER TABLE cademp.usuario_permissao ADD CONSTRAINT fk_usuario_permissao_usuario FOREIGN KEY (codigo_usuario)
	REFERENCES cademp.usuario(codigo)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;
    
ALTER TABLE cademp.usuario_permissao ADD CONSTRAINT fk_usuario_permissao_permissao FOREIGN KEY (codigo_permissao)
	REFERENCES cademp.permissao(codigo)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

CREATE SEQUENCE cademp.usuario_permissao_codigo_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;
ALTER TABLE cademp.usuario_permissao ALTER COLUMN codigo SET DEFAULT nextval('cademp.usuario_permissao_codigo_seq'::regclass);
