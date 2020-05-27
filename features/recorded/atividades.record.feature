#language:pt

@Record
Funcionalidade: Gravar requisições http para criação e exclusão de Atividades

@Blaze
Cenário: Login no BlazeMeter e inicio da gravação
    Dado que eu desejo obter um script de carga para a funcionalidade "atividades"
    Então eu inicio uma gravação do BlazeMeter

# idealmente isto só precisa rodar uma vez, mas o background roda pra cada
# novo cenário, e se esconder em um BeforeAll dentro do código fica dificil
# pro leitor entender então o melhor é apenas considerar estes
# passos como uma extensão do contexto, mas sem estar lá.
@NeedLogin
Cenário: Inserção das dependencias necessárias (territorio -> imovel, equipe)
    E que cadastrei o territorio
    | tipo_de_territorio | nome | polígono                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | tipo_de_zona |
    | BAIRRO             | UNB  | [[-47.87269163585314,-15.752665672017788],[-47.8766827628673,-15.754028684785087],[-47.87406492686876,-15.763073901338192],[-47.871962075001086,-15.771416620456055],[-47.871747498279895,-15.775835644568444],[-47.86586809611925,-15.775133563058382],[-47.8660397574962,-15.771953516373763],[-47.86410856700548,-15.771375320711222],[-47.85968828654894,-15.771581819351308],[-47.85440969920763,-15.76869081926306],[-47.85462427592882,-15.762235941089967],[-47.85509634471544,-15.761203398235875],[-47.85689878917345,-15.761162096412473],[-47.860246186024035,-15.760294756179908],[-47.861748223072375,-15.762566353694035],[-47.8645806357921,-15.76306197159169],[-47.87119890821016,-15.755406637151475],[-47.87269163585314,-15.752665672017788]] | Urbana       |
    E que cadastrei o imovel no territorio cadastrado
    | código | versão | tipo_de_imovel | logradouro                          | número | sequência | complemento | ponto_de_referência | cep      | polígono                                                                                                                                                                                                                                                                                         | lado_do_quarteirão |
    | 1      | 1      | AEROPORTO      | Faculdade de Ciências da Saúde (FS) | 10     | 1         | 1           | nenhum              | 71925360 | [[-15.76749540860986,-47.86690056324006],[-15.768145891053692,-47.867758870124824],[-15.768693120700888,-47.867780327796936],[-15.770469025615412,-47.86647140979767],[-15.768971897500876,-47.86576330661774],[-15.767815487533298,-47.86598861217499],[-15.76749540860986,-47.86690056324006]] | 125                |
    E que cadastrei a equipe "_Equipe__0" com os usuarios
    | nome      | cargo      |
    | Usuário 3 | supervisor |
    | Usuário 1 | agente     |
    | Usuário 2 | agente     |

@NeedLogin
Cenário: Cadastro com sucesso de uma atividade
    Quando eu acessar a pagina de atividades
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
    E irei salvar a atividade

@NeedLogin
Esquema do Cenário: Excluir as atividades recem cadastradas
    Quando eu acessar a pagina de atividades
    Então eu vou excluir a atividade "<titulo_atividade>"

Exemplos:
| titulo_atividade   |
| teste_automatizado |

@NeedLogin
Esquema do Cenário: Excluir as dependencias de forma explicita (territorio, imovel, equipe)
    Então irei excluir a dependencia "<dep>"

Exemplos:
| dep        |
| imovel     |
| equipe     |
| territorio |

@Blaze
Cenário: TearDown
    Então paro a gravação do BlazeMeter