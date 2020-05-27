#language:pt

@Record
Funcionalidade: Gravar requisições http para criação e exclusão de Perfis de Usuario

@Blaze
Cenário: Login no BlazeMeter e inicio da gravação
    Dado que eu desejo obter um script de carga para a funcionalidade "perfis_de_usuario"
    Então eu inicio uma gravação do BlazeMeter

@NeedLogin
Cenário: Cadastro com sucesso de um Perfil com todas as Autoridades sobre tudo
    Quando eu acessar a pagina de Perfis de Usuario
    Então eu vou cadastrar um perfil com os dados básicos
    | nome       | descricao                  |
    | aa_GODMODE | fui inserido pelo cucumber |
    E irei atribuir os recursos
    | recurso | autoridade  |
    | Todas   | TODAS AÇÕES |
    E irei atribuir os formularios
    | formulario     | autoridade |
    | Inspeção Geral | EDITAR     |
    E irei salvar o perfil

@NeedLogin
Esquema do Cenário: Excluir o perfil de usuario recem cadastrado
    Quando eu acessar a pagina de Perfis de Usuario
    Então eu vou excluir o perfil de usuario "<nome_perfil>"

Exemplos:
| nome_perfil |
| aa_GODMODE  |

@Blaze
Cenário: TearDown
    Então paro a gravação do BlazeMeter