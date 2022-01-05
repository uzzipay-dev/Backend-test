<h1 align="center">
🏆 uzzipay backend test
</h1>

## 🧪 Tecnologias ##

As seguintes tecnologias foram utilizadas no projeto:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## ✔️ Como executar aplicação ## 

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Docker version 20.X.X](https://docs.docker.com/get-docker/)
- [docker-compose version 1.29.X](https://docs.docker.com/compose/install/)

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:araujo-jp/Backend-test.git uzzipay

$ cd uzzipay
```

Crie o arquivo de variáveis com base no exemplo.

```bash
$ cp .env.example .env
```

Execute o comando para criar os containers.

```bash
$ docker-compose up -d --build
```

Execute as migrations.
> Nota: Execute os comandos no container de nome uzzipay

```bash
# 1. entrar no container
$ docker exec -it uzzipay sh

# 2. execute as migrations
$ yarn typeorm migration:run

# 3. crie o usuário administrador
yarn seed:admin
```
> Nota: O email e senha do usuário administrador está descrito no arquivo `.env`

📌 Para acompanhar os logs da aplicação em tempo real.

```bash
docker-compose logs -f
```

Por fim, a aplicação estará disponível em http://localhost:3333/docs

---

## ✔️ Como executar os testes ## 

Para executar os testes e necessário executar os seguintes comandos

> Nota: Execute os comandos no container de nome uzzipay
```bash
# 1. entrar no container
$ docker exec -it uzzipay sh

# 2. execute o script de criação da base de dados de teste
$ yarn seed:db

# 3. execute os testes
$ yarn test --coverage
```
---

<p align="center">Feito com ❤️ por João Paulo Araújo</p>