CREATE TABLE cademp.empresa (
	codigo BIGINT,
	razaoSocial VARCHAR(255) NOT NULL,
	nomeFantasia VARCHAR(255),
	documento VARCHAR(255),
	tipoEmpresa BIGINT,
	codigo_endereco BIGINT,
	contato VARCHAR(255),
	email VARCHAR(255),
	complemento VARCHAR(255),
	ativo BOOLEAN NOT NULL,
	PRIMARY KEY ( codigo ),
    CONSTRAINT unique_empresa_codigo UNIQUE( codigo ));

ALTER TABLE cademp.empresa ADD CONSTRAINT fk_pessoa_endereco FOREIGN KEY (codigo_endereco)
	REFERENCES cademp.endereco(codigo)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

CREATE SEQUENCE cademp.empresa_codigo_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

ALTER TABLE cademp.empresa ALTER COLUMN codigo SET DEFAULT nextval('cademp.empresa_codigo_seq'::regclass);
