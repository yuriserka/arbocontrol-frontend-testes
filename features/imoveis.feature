#language:pt

Funcionalidade: Cadastrar um Imóvel

Contexto:
    Dado que estou logado com
    | cpf            | senha         | unidade  |
    | 111.111.111-11 | 12345678@arbo | SES - AM |

Cenário: Cadastro com sucesso
    Quando eu acessar a pagina dos imoveis
    Então eu vou cadastrar o imovel
    | código | versão | território | tipo_de_imovel | logradouro                          | número | sequência | complemento | ponto_de_referência | cep      | polígono                                                                                                                                                                                                                                                                                         | lado_do_quarteirão |
    | 1      | 1      | Bela Vista | AEROPORTO      | Faculdade de Ciências da Saúde (FS) | 10     | 1         | 1           | nenhum              | 71925360 | [[-15.76749540860986,-47.86690056324006],[-15.768145891053692,-47.867758870124824],[-15.768693120700888,-47.867780327796936],[-15.770469025615412,-47.86647140979767],[-15.768971897500876,-47.86576330661774],[-15.767815487533298,-47.86598861217499],[-15.76749540860986,-47.86690056324006]] | 125                |
