#language:pt

Funcionalidade: Login
    Sendo eu um usuário já cadastrado por um administrador,
    espero conseguir acessar o sistema.

Esquema do Cenário: Login com sucesso
    Dado que eu navego até a url do site do SisVetor
    Quando eu entro com meu cpf "<cpf>"
    E eu entro com minha senha "<senha>"
    E seleciono a unidade "<unidade>"
    Então eu clico para entrar
    E meu nome "<nome>" deve estar visível na página inicial

Exemplos:
| cpf            | senha    | nome      | unidade  |
| 111.111.111-11 | 12345678 | Usuário 1 | SES - AM |
| 222.222.222-22 | 12345678 | Usuário 2 | SES - AM |
