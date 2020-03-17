#language:pt

Funcionalidade: Cadastrar uma Atividade

Contexto:
    Dado que estou logado com
    | cpf            | senha         | unidade  |
    | 111.111.111-11 | 12345678@arbo | SES - AM |

Cenário: Cadastro com sucesso
    # idealmente isto só precisa rodar uma vez, mas o background roda pra cada novo cenário,
    # e se esconder em um BeforeAll dentro do código fica totalmente escondido pro leitor
    # então o melhor é apenas considerar estes passos como uma extensão do contexto, mas
    # sem estar lá.
    E que cadastrei o imovel
    | código | versão | território | tipo_de_imovel | logradouro                          | número | sequência | complemento | ponto_de_referência | cep      | polígono                                                                                                                                                                                                                                                                                         | lado_do_quarteirão |
    | 1      | 1      | Bela Vista | AEROPORTO      | Faculdade de Ciências da Saúde (FS) | 10     | 1         | 1           | nenhum              | 71925360 | [[-15.76749540860986,-47.86690056324006],[-15.768145891053692,-47.867758870124824],[-15.768693120700888,-47.867780327796936],[-15.770469025615412,-47.86647140979767],[-15.768971897500876,-47.86576330661774],[-15.767815487533298,-47.86598861217499],[-15.76749540860986,-47.86690056324006]] | 125                |
    E que cadastrei a equipe "_Equipe__0" com os usuarios
    | nome      | cargo      |
    | Usuário 3 | supervisor |
    | Usuário 1 | agente     |
    | Usuário 2 | agente     |
    Quando eu acessar a pagina de atividades
    # começo de fato da feature de cadastro de uma atividade
    Então eu vou cadastrar uma atividade com os dados básicos
    | titulo             | descricao                  | dataInicio | dataFim    | abrangencia | tipo_de_atividade      |
    | teste_automatizado | fui inserido pelo cucumber | 20/02/2020 | 21/02/2020 | Imóvel      | PE - Ponto Estratégico |
    # comentar visto que ainda não implementei essa parte
    # E irei atribuir as demandas
    # | número |
    # | 2004   |
    # | 2033   |
    # | 2045   |
    E irei atribuir os imoveis
    | logradouro                          |
    | Faculdade de Ciências da Saúde (FS) |
    E irei atribuir as equipes
    | nome       |
    | _Equipe__0 |
    E irei salvar

Esquema do Cenário: Excluir a atividade recem cadastrada
    # para os testes, todas as dependencias de uma atividade serão exluidas também, portanto
    # o imovel e equipe criados serão excluidos no AfterAll, mas aqui será especificado apenas
    # a exclusão da atividade em si
    Então eu vou excluir a atividade "<titulo_atividade>"

Exemplos:
| titulo_atividade   |
| teste_automatizado |