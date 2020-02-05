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
    | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saida | tipo_de_visita | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | numero_final | qtde_tubitos | tipo_1 | qtde_tipo1_(g) | qtde_tratados | tipo_2 | qtde_tipo2_(g) | qtde_tratados |
    | Usuário 1 | Usuário 2  | 1              | 1               | PE: Ponto Estratégico | 1     | 1             | 1               | 1             | Normal         | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | 1      | 1              | 1             | 1      | 1              | 1             |

Exemplos:
| numero_atividade | codigo_imovel |
| 5018             | 5017          |