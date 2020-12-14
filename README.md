# FoodS 

Com o FoodS é possível pesquisar receitas de comida usando até três ingredientes na pesquisa. É possível receber Gifs, titulos e links, bem como os ingredientes das receitas no resultado dessas pesquisas.

## Instalação

Após extrair os arquivos, no diretorio raiz, utilize os comandos abaixo:

```bash
docker-compose build && docker-compose up -d
```

As seguintes portas listadas abaixo precisam estar desocupadas para o serviço de API:

**Portas**: `3000:3000`

Não é necessário definir as váriaveis de ambiente. Elas já estão pré-definidas no arquivo docker-compose.yml 

Váriaveis de ambiente utilizadas:

- PORT=3000 
- RECIPES_API_URL=http://www.recipepuppy.com/api/
- GIPHY_API_URL=http://api.giphy.com/v1/
- GIPHY_API_KEY=hP51EzERZRxA0tAT9l0ENM42tnjMYpBH

## Arquitetura

Foi utilizado um container para subir a API. A porta exposta foi a 3000. Não existem definições de redes ou outros containers com bancos de dados. 

A aplicação está divida em pastas, entre elas: routes, handlers, controllers, constants, schemas, utils, services e middlewares. 

A regra de negócio é pertinente à pasta controllers. 

Toda requisição do usúario passa antes por uma validação de status dos serviços externos.

## Lista de end points disponíveis na aplicação:

- GET /recipes/? 

Todos os end points utilizam validações com o JOI.

`Para a criação de testes unitários foi utilizado o Jest, instalado nas dependências de desenvolvimento. Foi utilizado o SuperJest para realizar testes de validações nos dados de input. Não foram criados testes integrados.`  

## Versionamento 

Foi utilizado o GitHub para controle de PR's e o versionamento do projeto. Praticamente todo o desenvolvimento foi criado em cima da branch Develop. Não foi utilizado branchs de features e PR's. 

## Postman Collection com todos os end points.

[FoodS Project Collection](https://www.getpostman.com/collections/12ae9180ab33f4b206c2)
