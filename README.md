# arbocontrol-frontend-testes

Repositório com o fim de realizar os testes de interface voltados para o frontend do sistema do Arbocontrol.

## Programas necessários

- [NodeJS e NPM](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/)

## Executando os testes

- Inicialize o Docker
- Navegue até a pasta onde se encontra  a configuração dos containers de testes do Arbocontrol e execute
    ```
    $ docker-compose up
    ```
- instale as dependencias necessárias do projeto com:
    ```
    $ yarn
    ```
- abra outro terminal e execute
    ```
    $ yarn webdriver:start
    ```
- por fim abra mais um terminal e execute
    ```
    $ yarn test
    ```

## Checando os resultados

Os resultados dos testes são criados após o fim da execução dos mesmos e estão dispostos em uma tabela. Basta abrir o arquivo [reports/report/index.html](reports/report/index.html) em algum navegador.

## Gerando a documetação

Basta executar o comando 

```
$ yarn docs
```
