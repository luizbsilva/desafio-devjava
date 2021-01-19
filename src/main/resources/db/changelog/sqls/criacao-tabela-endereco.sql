CREATE TABLE cademp.endereco (
	codigo BIGINT,
	end_uf character varying(2) NOT NULL,
  end_municipio character varying NOT NULL,
  end_bairro character varying NOT NULL,
  end_logradouro character varying NOT NULL,
  end_cep character varying(8) NOT NULL,
	PRIMARY KEY ( codigo ),
    CONSTRAINT unique_endereco_codigo UNIQUE( codigo ));

CREATE SEQUENCE cademp.endereco_codigo_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;
ALTER TABLE cademp.endereco ALTER COLUMN codigo SET DEFAULT nextval('cademp.endereco_codigo_seq'::regclass);