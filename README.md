# ARBO_frontend_tests
Repositório com o fim de realizar os testes de interface voltados para o front end do sistema do arbo control.

## Programas necessários

- [NodeJS e NPM](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

## Instalando as dependências

```yarn install```

#### Instalando o Protractor
```
npm install -g protractor
```

##### Atualizando o WebDriver
```
webdriver-manager update
```

## Executando os testes
- Inicialize o Docker
- Navegue até a pasta onde se encontra  a configuração dos containers de testes do arbocontrol
    ```
    docker-compose up
    ```
- abra outro terminal e execute
    ```
    webdriver-manager start
    ```
- por fim abra mais um terminal e execute
    ```
    yarn test
    ```