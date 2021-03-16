## Estrutura
**tbl_product**
* pro_key int pk
pro_name varchar(50)
pro_price

**tbl_category**
* cat_code int pk
cat_descricao varchar(50)

**tbl_product_category**
* pro_codigo int pk
* cat_codigo int pk

## Princípios
Dependency Inversion Principle (DIP)
Liskov Substitution Principle (LSP)
Don't Repeat Yourself (DRY)

## Design Patterns
Singleton

## Metodologias e Designs
Clean Architecture
Use Cases
Conventional Commits

## Bibliotecas e Ferramentas
Typescript
Git
Docker
Postgress
Eslint
Standard Javascript Style

## Features do Node
Documentação de API com Swagger

## Requisitos para executar a aplicação
Docker
Docker-compose

## Como Executar
Acessar a pastar raiz
```
docker-compose up
```