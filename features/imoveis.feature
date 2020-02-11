#language:pt

Funcionalidade: Cadastrar uma equipe

Contexto:
  Dado que estou logado com
  | cpf            | senha         | unidade  |
  | 111.111.111-11 | 12345678@arbo | SES - AM |

Cenário: Cadastro com sucesso
  Quando eu acessar a pagina dos imoveis
  Então eu vou cadastrar o imovel
  | código | versão | território | tipo_de_imovel | logradouro | número | sequência | complemento | ponto_de_referência | cep      | polígono                                                                                                                                                                            | lado_do_quarteirão |
  | 1      | 1      | Bela Vista | AEROPORTO      | teste      | 10     | 1         | 1           | nenhum              | 71925360 | [[-532.265625,76.18499546094714],[-532.6171875,-76.67978490310692],[-20.39062499999998,-75.49715731893085],[-21.093749999999957,76.01609366420996],[-532.265625,76.18499546094714]] | 125                |