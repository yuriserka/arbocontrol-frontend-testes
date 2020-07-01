#language:pt

@Record
Funcionalidade: Gravar requisições http para login
    Sendo eu um usuário já cadastrado por um administrador,
    espero conseguir acessar o sistema.

@Blaze
Cenário: Login no BlazeMeter e inicio da gravação
    Dado que eu desejo obter um script de carga para a funcionalidade "login"
    Então eu inicio uma gravação do BlazeMeter

# para poder dar trigger no outro cenário e desativar o popup do blaze
# a tag é para evitar o logout
@Blaze
Cenário: Entrar na página
    Dado que eu navego até a url do site do SisVetor

Esquema do Cenário: Login com sucesso
    Quando eu entro com meu cpf "<cpf>"
    E eu entro com minha senha "<senha>"
    E seleciono a unidade "<unidade>"
    Então eu clico para entrar

Exemplos:
| cpf            | senha    | nome      | unidade  |
| 111.111.111-11 | 12345678 | Usuário 1 | SES - AM |
| 222.222.222-22 | 12345678 | Usuário 2 | SES - AM |

@Blaze
Cenário: TearDown
    Então paro a gravação do BlazeMeter
