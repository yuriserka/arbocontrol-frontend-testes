#language:pt

Funcionalidade: Cadastrar uma Atividade

Contexto:
    Dado que estou logado com
    | cpf            | senha         | unidade  |
    | 111.111.111-11 | 12345678@arbo | SES - AM |
    Quando eu acessar a pagina de atividades

Cenário: Cadastro com sucesso
    Então eu vou cadastrar uma atividade com os dados básicos
    | titulo             | descricao                  | dataInicio | dataFim    | abrangencia | tipo_de_atividade      |
    | teste_automatizado | fui inserido pelo cucumber | 20/02/2020 | 21/02/2020 | Imóvel      | PE - Ponto Estratégico |
    E irei atribuir as demandas
    | número |
    | 2004   |
    | 2033   |
    | 2045   |
    E irei atribuir os imoveis
    | logradouro                                   |
    | Faculdade de Ciências da Saúde (FS) - Manual |
    E irei atribuir as equipes
    | nome                  |
    | equipe teste - Manual |
    E irei salvar
    