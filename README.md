# arbocontrol-frontend-testes

Repositório com o fim de realizar os testes de interface voltados para o frontend do sistema do Arbocontrol.

## Programas necessários

- [NodeJS e NPM](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

## Executando os testes
- Inicialize o Docker
- Navegue até a pasta onde se encontra  a configuração dos containers de testes do Arbocontrol e execute
    ```
    docker-compose up
    ```
- abra outro terminal e execute
    ```
    yarn webdriver:start
    ```
- por fim abra mais um terminal e execute
    ```
    yarn test
    ```
