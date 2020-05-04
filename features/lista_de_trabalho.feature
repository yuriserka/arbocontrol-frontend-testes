#language:pt

Funcionalidade: Inserir registros na lista de trabalho

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

# Extensão ainda das dependencias, inserindo atividades de varios tipos para
# testar o preenchimento de formularios
Esquema do Cenário: criação de atividades de diferentes tipos
    E que cadastrei uma atividade do tipo "<tipo>" com o imovel e a equipe criados
    | titulo     | descricao                  | dataInicio | dataFim    | abrangencia |
    | atividade_ | fui inserido pelo cucumber | 20/02/2020 | 21/02/2020 | Imóvel      |

Exemplos:
    | tipo                     |
    | PE - Ponto Estratégico   |
    # | DF - Delimitação de Foco |

Esquema do Cenário: Inserção com sucesso de registros para o formulario de inspeção geral
    Quando eu acessar a pagina da lista de trabalho
    Então eu vou selecionar a atividade do tipo "<tipo_atividade_sigla>"
    E selecionar o imovel "<logradouro_imovel>"
    E selecionar o formulario "<formulario>"
    E irei cadastrar registros com os valores
    | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saída | tipo_de_visita | tipo_de_tratamento | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | número_final | qtde_tubitos | tipo_1   | qtde_tipo_1_g | qtde_tratados_1 | tipo_2    | qtde_tipo_2_g | qtde_tratados_2 | tipo_adulticida        | quantidade_cargas |
    | Usuário 1 | Usuário 3  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 1000            | 1100          | Normal         | focal              | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |
    | Usuário 1 | Usuário 3  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 1000            | 1100          | Normal         | focal              | Fechado   | 4               | 4           | 4            | 4               | 4           | 4            | 4              | 4          | 4           | 4              | 4          | 4           | 4               | 4           | 4            | 4               | 4           | 4            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |

Exemplos:
| tipo_atividade_sigla | logradouro_imovel                   | formulario     |
| PE                   | Faculdade de Ciências da Saúde (FS) | Inspeção Geral |

# Esquema do Cenário: Inserção com sucesso de um registro de campo
#     Quando eu acessar a pagina da lista de trabalho
#     Então eu vou selecionar a atividade do tipo "<tipo_atividade_sigla>"
#     E selecionar o imovel "<logradouro_imovel>"
#     E selecionar o formulario "<formulario>"
#     E irei cadastrar registros com os valores
#     | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saída | tipo_de_visita | tipo_de_tratamento | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | número_final | qtde_tubitos | tipo_1   | qtde_tipo_1_g | qtde_tratados_1 | tipo_2    | qtde_tipo_2_g | qtde_tratados_2 | tipo_adulticida        | quantidade_cargas |
#     | Usuário 1 | Usuário 3  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 100             | 110           | Normal         | focal              | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |
#     | Usuário 1 | Usuário 3  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 100             | 110           | Normal         | focal              | Fechado   | 4               | 4           | 4            | 4               | 4           | 4            | 4              | 4          | 4           | 4              | 4          | 4           | 4               | 4           | 4            | 4               | 4           | 4            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |

# Exemplos:
# | tipo_atividade_sigla | logradouro_imovel                   | formulario                                                       |
# | PE                   | Faculdade de Ciências da Saúde (FS) | Campo PE - Formulário de Ações de Campo para Pontos Estratégicos |

# Esquema do Cenário: Inserção com sucesso de um registro de laboratório de dengue por amostra
#     Quando eu acessar a pagina da lista de trabalho
#     Então eu vou selecionar a atividade do tipo "<tipo_atividade_sigla>"
    # E selecionar o imovel "<logradouro_imovel>"
    # E selecionar o formulario "<formulario>"
    # E irei cadastrar registros com os valores
    # | data_de_entrada | observação | data_da_conclusão | técnico_responsável | quantidade_de_amostras |
    # | 10/10/2020      | nenhuma    | 11/10/2020        | exemplo_2           | 3                      |
    # | 10/10/2020      | segundo    | 12/11/2021        | exemplo_3           | 2                      |
    # | 10/10/2020      | third      | 13/02/2022        | exemplo_1           | 1                      |
    # E Adicionar as seguintes amostras
    # | número | tipo_de_criadouro | espécie       | fase   | quantidade |
    # | 10     | B                 | Aedes aegypti | Larva  | 100        |
    # | 11     | E                 | Outros        | Adulto | 11         |
    # | 12     | D1                | Aedes aegypti | Pupa   | 3          |
    # | 13     | C                 | Aedes aegypti | Adulto | 6          |
    # | 14     | D1                | Aedes aegypti | Larva  | 3          |
    # | 15     | D1                | Aedes aegypti | Adulto | 3          |

# Exemplos:
# | tipo_atividade_sigla | logradouro_imovel                   | formulario                                   |
# | PE                   | Faculdade de Ciências da Saúde (FS) | Laboratório - Dengue Por Amostra (Manaus-AM) |

# Esquema do Cenário: Inserção com sucesso de um registro de laboratorio de dengue
#     Quando eu acessar a pagina da lista de trabalho
#     Então eu vou selecionar a atividade do tipo "<tipo_atividade_sigla>"
#     E selecionar o imovel "<logradouro_imovel>"
#     E selecionar o formulario "<formulario>"
#     E irei cadastrar registros com os valores
#     | data_de_entrada | a1_aegypti | a2_aegypti | b_aegypti | c_aegypti | d1_aegypti | d2_aegypti | e_aegypti | larvas_aegypti | pupas_aegypti | exúvia_de_pupas_aegypti | adultos_aegypti | a1_albopictus | a2_albopictus | b_albopictus | c_albopictus | d1_albopictus | d2_albopictus | e_albopictus | larvas_albopictus | pupas_albopictus | exúvia_de_pupas_albopictus | adultos_albopictus | a1_outros | a2_outros | b_outros | c_outros | d1_outros | d2_outros | e_outros | larvas_outros | pupas_outros | exúvia_de_pupas_outros | adultos_outros | data_de_conclusão | nome_do_laboratorista | observação |
#     | 11/02/2020      | 1          | 1          | 1         | 1         | 1          | 1          | 1         | 1              | 1             | 1                       | 1               | 1             | 1             | 1            | 1            | 1             | 1             | 1            | 1                 | 1                | 1                          | 1                  | 1         | 1         | 1        | 1        | 1         | 1         | 1        | 1             | 1            | 1                      | 1              | 13/03/2020        | laboratorista         | nenhuma    |          

# Exemplos:
# | tipo_atividade_sigla | logradouro_imovel                   | formulario           |
# | DF                   | Faculdade de Ciências da Saúde (FS) | Laboratório - Dengue |

# Esquema do Cenário: Inserção com sucesso de um registro de visita para ovitrampas
#     Quando eu acessar a pagina da lista de trabalho
#     Então eu vou selecionar a atividade do tipo "<tipo_atividade_sigla>"
#     E selecionar o imovel "<logradouro_imovel>"
#     E selecionar o formulario "<formulario>"
#     E irei cadastrar registros com os valores
#     | agente    | supervisor | data_da_visita | código_da_armadilha | objetivo_da_visita  | localização_no_imóvel | ocorrência                  | observações     |
#     | Usuário 1 | Usuário 2  | 25/03/2020     | 10                  | 5-Coleta da palheta | Quintal               |                             | sem ocorrencias |
#     | Usuário 1 | Usuário 2  | 25/03/2020     | 16                  | 5-Coleta da palheta | Jardim                | 8 - ARMADILHA NÃO INSTALADA | com ocorrencias |

# Exemplos:
# | tipo_atividade_sigla | logradouro_imovel                   | formulario                              |
# | L                    | Faculdade de Ciências da Saúde (FS) | Visita para Ovitrampas (Sete Lagoas-MG) |

Esquema do Cenário: Excluir os registros que foram inseridos na lista de trabalho
    Quando eu acessar a pagina da lista de trabalho
    Então irei excluir todos os registros da atividade do tipo "<tipo_atividade_sigla>" do formulario "<formulario>"

Exemplos:
    | tipo_atividade_sigla | formulario     |
    | PE                   | Inspeção Geral |
    # | PE                   | Laboratório - Dengue Por Amostra (Manaus-AM)                     |

Esquema do Cenário: Excluir as dependencias de forma explicita (atividades, imovel, territorio, equipe)
    Então irei excluir a dependencia "<dep>"

Exemplos:
| dep          |
| atividades   |
| imovel       |
| territorio   |
| equipe       |
# | perfil_admin |

Cenário: remover as dependencias de forma explicita (permissao de edição, formularios atribuidos)
    Então irei remover a permissao para edicao de novas atividades
    Então irei desatribuir os formularios dos tipos de atividades
    | tipo_de_atividade      | nome_do_formulario |
    | PE - Ponto Estratégico | Inspeção Geral	  |
