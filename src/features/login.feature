#language:pt

Funcionalidade: Login

Esquema do Cenário: Login com sucesso

Dado que eu navego até o site "http://localhost/"
Quando eu entro com meu cpf "<cpf>"
E eu entro com minha senha "<senha>"
E seleciono a primeira opção de unidade
Então eu clico no botão "Entrar"
E meu nome "<nome>" deve estar visível na página inicial

Exemplos:
| cpf            | senha   | nome      |
| 111.111.111-11 | 12345678 | Usuário 1 |