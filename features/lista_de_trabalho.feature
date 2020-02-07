#language:pt

Funcionalidade: Inserir um registro em uma atividade já cadastrada

Contexto:
    Dado que estou logado com
    | cpf            | senha    |
    | 111.111.111-11 | 12345678 |

Esquema do Cenário: Inserção com sucesso
    Quando eu acessar a pagina da lista de trabalho
    Então eu vou selecionar a atividade "<numero_atividade>"
    E selecionar o imovel "<codigo_imovel>"
    E irei cadastrar um registro com os valores
    | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saída | tipo_de_visita | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | número_final | qtde_tubitos | tipo_1   | qtde_tipo_1_(g) | qtde_tratados | tipo_2    | qtde_tipo_2_(g) | qtde_tratados | tipo_adulticida        | quantidade_cargas |
    | Usuário 1 | Usuário 2  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 100             | 110           | Normal         | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1               | 1             | Novaluron | 1               | 1             | Alfacypermetrina SC 20 | 1                 |

Exemplos:
| numero_atividade | codigo_imovel |
| 5018             | 5017          |