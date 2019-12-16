#language:pt

Funcionalidade: Login
    Sendo eu um usuário já cadastrado por um administrador,
    espero conseguir acessar o sistema.

Esquema do Cenário: Login com sucesso
    Dado que eu navego até o site "http://localhost/"
    Quando eu entro com meu cpf "<cpf>"
    E eu entro com minha senha "<senha>"
    E seleciono a primeira opção de unidade
    Então eu clico no botão "Entrar"
    E meu nome "<nome>" deve estar visível na página inicial
    Então eu faço Logoff

Exemplos:
| cpf            | senha    | nome      |
| 111.111.111-11 | 12345678 | Usuário 1 |
| 222.222.222-22 | 12345678 | Usuário 2 |