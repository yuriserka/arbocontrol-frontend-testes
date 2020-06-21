#language:pt

@Record
Funcionalidade: Gravar requisições http para navegação no sistema
    Uma vez que estou logado, eu posso acessar as funcionalidades restritas
    aos meus privilégios de acesso.

@Blaze
Cenário: Login no BlazeMeter e inicio da gravação
    Dado que eu desejo obter um script de carga para a funcionalidade "navegacao"
    Então eu inicio uma gravação do BlazeMeter

@NeedLogin
Esquema do Cenário: Acessar todas as áreas do sistema sendo super admin
    Quando eu clicar para expandir a barra de navegação
    E clicar no botão "<nome_botao>"
    Então a url deve ser "<url>"

Exemplos:
| nome_botao                       | url                                        |
| formularios                      | <env.url>/formularios                      |
| relatorios_indices               | <env.url>/relatorios-indices               |
| exportar                         | <env.url>/exportar                         |
| processo_importacao              | <env.url>/processo-importacao              |
| demandas                         | <env.url>/demandas                         |
| lista_trabalho                   | <env.url>/lista-trabalho                   |
| atividades                       | <env.url>/atividades                       |
| imoveis                          | <env.url>/imoveis                          |
| territorios                      | <env.url>/territorios                      |
| areas_gestao                     | <env.url>/areas-gestao                     |
| unidades                         | <env.url>/unidades                         |
| pessoas                          | <env.url>/pessoas                          |
| equipes                          | <env.url>/equipes                          |
| perfis_usuarios                  | <env.url>/perfis-usuarios                  |
| perfil_usuario_unidade           | <env.url>/perfil-usuario-unidade           |
| gerenciar_vetor                  | <env.url>/gerenciar/vetor                  |
| situacoes_atividade              | <env.url>/situacoes-atividade              |
| tipos_atividades                 | <env.url>/tipos-atividades                 |
| gerenciar_tipo_vinculo           | <env.url>/gerenciar/tipo-vinculo           |
| cargos                           | <env.url>/cargos                           |
| niveis_gestao                    | <env.url>/niveis-gestao                    |
| fluxos_trabalho                  | <env.url>/fluxos-trabalho                  |
| visoes                           | <env.url>/visoes                           |
| gerenciar_tipo_territorio        | <env.url>/gerenciar/tipo-territorio        |
| gerenciar_tipo_imovel            | <env.url>/gerenciar/tipo-imovel            |
| gerenciar_tipo_ponto_estrategico | <env.url>/gerenciar/tipo-ponto-estrategico |
| gerenciar_solicitante            | <env.url>/gerenciar/solicitante            |
| gerenciar_origem_demanda         | <env.url>/gerenciar/origem-demanda         |
| gerenciar_categoria_demanda      | <env.url>/gerenciar/categoria-demanda      |
| gerenciar_abrangencia            | <env.url>/gerenciar/abrangencia            |
| gerenciar_prioridade_demanda     | <env.url>/gerenciar/prioridade-demanda     |
| gerenciar_situacao_demanda       | <env.url>/gerenciar/situacao-demanda       |

@Blaze
Cenário: TearDown
    Então paro a gravação do BlazeMeter