#language:pt

Funcionalidade: Cadastrar um Imóvel

Contexto:
    Dado que estou logado com
    | cpf            | senha         | unidade  |
    | 111.111.111-11 | 12345678@arbo | SES - AM |

Cenário: Cadastro com sucesso
    Quando eu acessar a pagina dos imoveis
    Então eu vou cadastrar o imovel
    | código | versão | território | tipo_de_imovel | logradouro | número | sequência | complemento | ponto_de_referência | cep      | polígono                                                                                                                                                                                                                                                  | lado_do_quarteirão |
    | 1      | 1      | Bela Vista | AEROPORTO      | teste      | 10     | 1         | 1           | nenhum              | 71925360 | [[-56.53273165225983,-22.108747224758403],[-56.534308791160576,-22.109780976542964],[-56.53229713439941,-22.110576165067343],[-56.531256437301636,-22.110516526083543],[-56.53046250343322,-22.109184582207334],[-56.53273165225983,-22.108747224758403]] | 125                |
