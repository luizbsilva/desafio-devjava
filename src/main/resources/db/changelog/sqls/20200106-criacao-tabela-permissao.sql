CREATE TABLE cademp.permissao (
	codigo BIGINT,
	nome VARCHAR(255) NOT NULL,
	PRIMARY KEY ( codigo ),
    CONSTRAINT unique_permissao_codigo UNIQUE( codigo ));

CREATE SEQUENCE cademp.permissao_codigo_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;
ALTER TABLE cademp.permissao ALTER COLUMN codigo SET DEFAULT nextval('cademp.permissao_codigo_seq'::regclass);

