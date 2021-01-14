CREATE TABLE cademp.usuario (
	codigo BIGINT,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	tipo_usuario VARCHAR(255),
	ativo BOOLEAN,
	PRIMARY KEY ( codigo ),
    CONSTRAINT unique_usuario_codigo UNIQUE( codigo ));

CREATE SEQUENCE usuario_codigo_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;
ALTER TABLE usuario_codigo_seq OWNER TO postgres;
ALTER TABLE cademp.usuario ALTER COLUMN codigo SET DEFAULT nextval('usuario_codigo_seq'::regclass);

