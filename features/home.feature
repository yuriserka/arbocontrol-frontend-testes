#language:pt

Funcionalidade: Acesso às funcionalidades do sistema
    Uma vez que estou logado, eu posso acessar as funcionalidades restritas
    aos meus privilégios de acesso.

Contexto:
    Dado que estou logado com
    | cpf            | senha         | unidade  |
    | 111.111.111-11 | 12345678@arbo | SES - AM |

Esquema do Cenário: Acessar todas as áreas do sistema sendo super admin
    Quando eu clicar para expandir a barra de navegação
    E clicar no botão "<nome_botao>"
    Então a url deve ser "<url>"

Exemplos:
| nome_botao             | url                              |
| formularios            | <env.url>/formularios            |
| relatorios_indices     | <env.url>/relatorios-indices     |
| exportar               | <env.url>/exportar               |
| processo_importacao    | <env.url>/processo-importacao    |
| demandas               | <env.url>/demandas               |
| lista_trabalho         | <env.url>/lista-trabalho         |
| atividades             | <env.url>/atividades             |
| imoveis                | <env.url>/imoveis                |
| territorios            | <env.url>/territorios            |
| areas_gestao           | <env.url>/areas-gestao           |
| unidades               | <env.url>/unidades               |
| pessoas                | <env.url>/pessoas                |
| equipes                | <env.url>/equipes                |
| perfis_usuarios        | <env.url>/perfis-usuarios        |
| perfil_usuario_unidade | <env.url>/perfil-usuario-unidade |
