#language:pt

Funcionalidade: Acesso às funcionalidades do sistema
    Uma vez que estou logado, eu posso acessar as funcionalidades restritas
    aos meus privilégios de acesso.

Contexto:
  Dado que estou logado com
    | cpf            | senha    |
    | 111.111.111-11 | 12345678 |
    
Esquema do Cenário: Acessar todas as áreas do sistema sendo super admin
    Quando eu clicar para expandir a barra de navegação
    E clicar no botão "<nome_botao>"
    Então a url deve ser "<url>"

Exemplos:
|       nome_botao       |                 url                     |
| formularios            | http://localhost/formularios            |
| relatorios_indices     | http://localhost/relatorios-indices     |
| exportar               | http://localhost/exportar               |
| processo_importacao    | http://localhost/processo-importacao    |
| demandas               | http://localhost/demandas               |
| lista_trabalho         | http://localhost/lista-trabalho         |
| atividades             | http://localhost/atividades             |
| imoveis                | http://localhost/imoveis                |
| territorios            | http://localhost/territorios            |
| areas_gestao           | http://localhost/areas-gestao           |
| unidades               | http://localhost/unidades               |
| pessoas                | http://localhost/pessoas                |
| equipes                | http://localhost/equipes                |
| perfis_usuarios        | http://localhost/perfis-usuarios        |
| perfil_usuario_unidade | http://localhost/perfil-usuario-unidade |
