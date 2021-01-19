Desafio Dev Java

CRUD básico de uma empresa seguindo o modelo de Histórias de
usuário.

## Considerações iniciais
Antes de dar início, certifique-se que tenha em sua máquina:
- [ ] Banco de dados Postgres versão 9.5 ou superior;
- [ ] Node versão 8.0 ou superior;
- [ ] Maven;
- [ ] Java 8;

## Primeios passos

Faça o `clone` do projeto com o seguinte comando: `git clone
https://github.com/luizbsilva/desafio-devjava.git`

Dentro do projeto acesse o diretório `sistema/src/main/angular` e
execute o comando `npm install`

## Criando um banco novo
Caso não tenha o postgres intalado em sua maquina e queira executar via docker rodar os comandos abaixo
 se não tiver o docker instalado siga as intruções da documentação oficial do Docker para o seu SO `https://docs.docker.com/get-docker/`

###Criando Container Docker Postgres
* Criando Docker do banco de dados `docker run -p 5432:5432 --name dockerpostgresql -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=otimo_empresas -d postgres:10.7-alpine`
* Criar Rede para Conectar container do banco com da aplicação `docker network create postgresnetwork`
* Conectar Container a rede criada `docker network connect postgresnetwork dockerpostgresql

#####Passos para criação de um novo banco:
- [ ] Crie um novo banco (postgres) com o nome otimo_empresas;
- [ ] Crie um `schema` chamado `cademp`;