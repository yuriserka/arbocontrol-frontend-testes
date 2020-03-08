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
    E irei cadastrar um registro de campo com os valores
    | agente    | supervisor | latitude_atual | longitude_atual | tipo_de_atividade     | ciclo | data_inspeção | hora_da_entrada | hora_da_saída | tipo_de_visita | tipo_de_tratamento | pendência | a1_inspecionado | a1_positivo | a1_eliminado | a2_inspecionado | a2_positivo | a2_eliminado | b_inspecionado | b_positivo | b_eliminado | c_inspecionado | c_positivo | c_eliminado | d1_inspecionado | d1_positivo | d1_eliminado | d2_inspecionado | d2_positivo | d2_eliminado | e_inspecionado | e_positivo | e_eliminado | numero_inicial | número_final | qtde_tubitos | tipo_1   | qtde_tipo_1_(g) | qtde_tratados_1 | tipo_2    | qtde_tipo_2_(g) | qtde_tratados_2 | tipo_adulticida        | quantidade_cargas |
    | Usuário 1 | Usuário 2  | 1              | 1               | PE: Ponto Estratégico | 1     | 05/02/2020    | 100             | 110           | Normal         | focal              | Fechado   | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1          | 1           | 1               | 1           | 1            | 1               | 1           | 1            | 1              | 1          | 1           | 1              | 1            | 1            | Temephós | 1               | 1               | Novaluron | 1               | 10              | Alfacypermetrina SC 20 | 1                 |
    E salvar

Exemplos:
| numero_atividade | logradouro_imovel                  |
| 5003             | RUA PE. AGOSTINHO CABALLERO MARTIN |

Esquema do Cenário: Inserção com sucesso de um registro de laboratório
    Então eu vou selecionar a atividade "<numero_atividade>"
    E selecionar o imovel "<logradouro_imovel>"
    E selecionarei a aba de registros de laboratório
    E irei cadastrar um registro de laboratório com os valores
    | data_de_entrada | observação | data_da_conclusão | técnico_responsável |
    | 10/10/2020      | nenhuma    | 11/10/2020        | exemplo_2           |
    E Adicionar as seguintes amostras
    | número | tipo_de_criadouro | espécie          | fase   | quantidade |
    | 10     | B                 | Aedes aegypti    | Larva  | 100        |
    | 11     | E                 | Aedes albopictus | Adulto | 35         |
    E salvar

Exemplos:
| numero_atividade | logradouro_imovel                  |
| 5003             | RUA PE. AGOSTINHO CABALLERO MARTIN |
