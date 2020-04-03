#language:pt

Funcionalidade: Cadastrar um Perfil de Usuario

Contexto:
    Dado que estou logado com
    | cpf            | senha    | unidade  |
    | 111.111.111-11 | 12345678 | SES - AM |
    Quando eu acessar a pagina de Perfis de Usuario

Cenário: Cadastro com sucesso de um Perfil com todas as Autoridades sobre tudo
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

Esquema do Cenário: Excluir o perfil de usuario recem cadastrado
    Então eu vou excluir o perfil de usuario "<nome_perfil>"

Exemplos:
| nome_perfil |
| aa_GODMODE  |
