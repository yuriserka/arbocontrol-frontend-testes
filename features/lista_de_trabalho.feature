#language:pt

Funcionalidade: Inserir registros em uma atividade já cadastrada

Contexto:
    Dado que estou logado com
    | cpf            | senha         | unidade  |
    | 111.111.111-11 | 12345678@arbo | SES - AM |
    Quando eu acessar a pagina da lista de trabalho

Esquema do Cenário: Inserção com sucesso de um registro de campo
    Então eu vou selecionar a atividade "<numero_atividade>"
    E selecionar o imovel "<logradouro_imovel>"
    E selecionar o formulario "<formulario>"
    E irei cadastrar registros com os valores
    | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saída | tipo_de_visita | tipo_de_tratamento | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | número_final | qtde_tubitos | tipo_1   | qtde_tipo_1_g | qtde_tratados_1 | tipo_2    | qtde_tipo_2_g | qtde_tratados_2 | tipo_adulticida        | quantidade_cargas |
    | Usuário 1 | Usuário 2  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 100             | 110           | Normal         | focal              | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |
    | Usuário 1 | Usuário 2  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 100             | 110           | Normal         | focal              | Fechado   | 4               | 4           | 4            | 4               | 4           | 4            | 4              | 4          | 4           | 4              | 4          | 4           | 4               | 4           | 4            | 4               | 4           | 4            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1             | 1               | Novaluron | 5             | 10              | Alfacypermetrina SC 20 | 1                 |

Exemplos:
| numero_atividade | logradouro_imovel                   | formulario                                                       |
| 5003             | Faculdade de Ciências da Saúde (FS) | Campo PE - Formulário de Ações de Campo para Pontos Estratégicos |

# Para o caso de laboratorio com amostras, fica dificil adicionar mais de um registro por vez dado que n amostras vão pertencer a tal registro
Esquema do Cenário: Inserção com sucesso de um registro de laboratório de dengue por amostra
    Então eu vou selecionar a atividade "<numero_atividade>"
    E selecionar o imovel "<logradouro_imovel>"
    E selecionar o formulario "<formulario>"
    E irei cadastrar registros com os valores
    | data_de_entrada | observação | data_da_conclusão | técnico_responsável | quantidade_de_amostras |
    | 10/10/2020      | nenhuma    | 11/10/2020        | exemplo_2           | 3                      |
    | 10/10/2020      | segundo    | 12/11/2021        | exemplo_3           | 2                      |
    | 10/10/2020      | third      | 13/02/2022        | exemplo_1           | 1                      |
    E Adicionar as seguintes amostras
    | número | tipo_de_criadouro | espécie       | fase   | quantidade |
    | 10     | B                 | Aedes aegypti | Larva  | 100        |
    | 11     | E                 | Outros        | Adulto | 11         |
    | 12     | D1                | Aedes aegypti | Pupa   | 3          |
    | 13     | C                 | Aedes aegypti | Adulto | 6          |
    | 14     | D1                | Aedes aegypti | Larva  | 3          |
    | 15     | D1                | Aedes aegypti | Adulto | 3          |

Exemplos:
| numero_atividade | logradouro_imovel                   | formulario                                   |
| 5003             | Faculdade de Ciências da Saúde (FS) | Laboratório - Dengue Por Amostra (Manaus-AM) |

#  Esquema do Cenário: Inserção com sucesso de um registro de laboratorio de dengue
#      Então eu vou selecionar a atividade "<numero_atividade>"
#      E selecionar o imovel "<logradouro_imovel>"
#      E selecionar o formulario "<formulario>"
#      E irei cadastrar registros com os valores
#      | data_de_entrada | a1_aegypti | a2_aegypti | b_aegypti | c_aegypti | d1_aegypti | d2_aegypti | e_aegypti | larvas_aegypti | pupas_aegypti | exúvia_de_pupas_aegypti | adultos_aegypti | a1_albopictus | a2_albopictus | b_albopictus | c_albopictus | d1_albopictus | d2_albopictus | e_albopictus | larvas_albopictus | pupas_albopictus | exúvia_de_pupas_albopictus | adultos_albopictus | a1_outros | a2_outros | b_outros | c_outros | d1_outros | d2_outros | e_outros | larvas_outros | pupas_outros | exúvia_de_pupas_outros | adultos_outros | data_de_conclusão | nome_do_laboratorista | observação |
#      | 11/02/2020      | 1          | 1          | 1         | 1         | 1          | 1          | 1         | 1              | 1             | 1                       | 1               | 1             | 1             | 1            | 1            | 1             | 1             | 1            | 1                 | 1                | 1                          | 1                  | 1         | 1         | 1        | 1        | 1         | 1         | 1        | 1             | 1            | 1                      | 1              | 13/03/2020        | laboratorista         | nenhuma    |          
#      E salvar
 
#  Exemplos:
#  | numero_atividade | logradouro_imovel                   | formulario           |
#  | 7003             | Faculdade de Ciências da Saúde (FS) | Laboratório - Dengue |

Esquema do Cenário: Inserção com sucesso de um registro de visita para ovitrampas
    Então eu vou selecionar a atividade "<numero_atividade>"
    E selecionar o imovel "<logradouro_imovel>"
    E selecionar o formulario "<formulario>"
    E irei cadastrar registros com os valores
    | agente    | supervisor | data_da_visita | código_da_armadilha | objetivo_da_visita  | localização_no_imóvel | ocorrência                  | observações     |
    | Usuário 1 | Usuário 2  | 25/03/2020     | 10                  | 5-Coleta da palheta | Quintal               |                             | sem ocorrencias |
    | Usuário 1 | Usuário 2  | 25/03/2020     | 16                  | 5-Coleta da palheta | Jardim                | 8 - ARMADILHA NÃO INSTALADA | com ocorrencias |

Exemplos:
| numero_atividade | logradouro_imovel                   | formulario                              |
| 5151             | Faculdade de Ciências da Saúde (FS) | Visita para Ovitrampas (Sete Lagoas-MG) |