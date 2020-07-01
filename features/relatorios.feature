#language:pt

Funcionalidade: Cadastrar relatorios

Contexto:
    Dado que estou logado com
    | cpf            | senha    | unidade  |
    | 111.111.111-11 | 12345678 | SES - AM |

Esquema do Cenário: Criação de recursos necessários para a edição da lista de trabalho
    E que o usuario atual pode editar novas atividades criadas
    E que a atividade do tipo "<tipo_de_atividade>" possui o formulario "<nome_do_formulario>"

Exemplos:
    | tipo_de_atividade      | nome_do_formulario |
    | PE - Ponto Estratégico | Inspeção Geral	  |

# idealmente isto só precisa rodar uma vez, mas o background roda pra cada
# novo cenário, e se esconder em um BeforeAll dentro do código fica dificil
# pro leitor entender então o melhor é apenas considerar estes
# passos como uma extensão do contexto, mas sem estar lá.
Cenário: Inserção das dependencias necessárias
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

# Extensão ainda das dependencias, inserindo atividades de varios tipos
Esquema do Cenário: criação de atividades de diferentes tipos
    E que cadastrei uma atividade do tipo "<tipo>" com o imovel e a equipe criados
    | titulo     | descricao                  | dataInicio | dataFim    | abrangencia |
    | atividade_ | fui inserido pelo cucumber | 20/02/2020 | 21/02/2020 | Imóvel      |

Exemplos:
    | tipo                     |
    | PE - Ponto Estratégico   |

Cenário: inserção de registros na lista de trabalho
    E que inseri os registros na lista de trabalho da atividade do tipo "PE" no imovel e formulario criados
    | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saída | tipo_de_visita | tipo_de_tratamento | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | número_final | qtde_tubitos | tipo_1   | qtde_tipo_1_g | qtde_tratados_1 | tipo_2    | qtde_tipo_2_g | qtde_tratados_2 | tipo_adulticida        | quantidade_cargas |
    | Usuário 1 | Usuário 3  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 1000            | 1100          | Normal         | focal              | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |
    | Usuário 1 | Usuário 3  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 1000            | 1100          | Normal         | focal              | Fechado   | 4               | 4           | 4            | 4               | 4           | 4            | 4              | 4          | 4           | 4              | 4          | 4           | 4               | 4           | 4            | 4               | 4           | 4            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |
    

Cenário: Cadastro com sucesso
    Quando eu acessar a pagina dos relatorios
    Então eu vou cadastrar o relatorio para o formulario: "Inspeção Geral" tendo como base os registros inseridos
    | campos                                                                                                                       | titulo          | tipo      |
    | Agente, Supervisor, Latitude Atual, Longitude Atual, Tipo de Atividade, Ciclo, Data Inspeção, Hora da entrada, Hora da saída | relatorio_teste | Relatório |

Esquema do Cenário: Excluir os relatorios recem cadastrados
    Quando eu acessar a pagina dos relatorios
    Então eu vou excluir o relatorio "<titulo_relatorio>" do formulario "<nome_do_formulario>"

Exemplos:
| titulo_relatorio | nome_do_formulario |
| relatorio_teste  | Inspeção Geral     |

Esquema do Cenário: Excluir os registros que foram inseridos na lista de trabalho
    Quando eu acessar a pagina da lista de trabalho
    Então irei excluir todos os registros da atividade do tipo "<tipo_atividade_sigla>" do formulario "<formulario>"

Exemplos:
    | tipo_atividade_sigla | formulario     |
    | PE                   | Inspeção Geral |

Esquema do Cenário: Excluir as dependencias de forma explicita (atividades, imovel, territorio, equipe)
    Então irei excluir a dependencia "<dep>"

Exemplos:
| dep          |
| atividades   |
| imovel       |
| territorio   |
| equipe       |

Cenário: remover as dependencias de forma explicita (permissao de edição, formularios atribuidos)
    Então irei remover a permissao para edicao de novas atividades
    Então irei desatribuir os formularios dos tipos de atividades
    | tipo_de_atividade      | nome_do_formulario |
    | PE - Ponto Estratégico | Inspeção Geral	  |
