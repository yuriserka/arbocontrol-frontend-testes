#language:pt

Funcionalidade: Cadastrar um Imóvel

Contexto:
    Dado que estou logado com
    | cpf            | senha    | unidade  |
    | 111.111.111-11 | 12345678 | SES - AM |

Cenário: Inserção das dependencias necessárias (territorio)
    E que cadastrei o territorio
    | tipo_de_territorio | nome | polígono                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | tipo_de_zona |
    | BAIRRO             | UNB  | [[-47.87269163585314,-15.752665672017788],[-47.8766827628673,-15.754028684785087],[-47.87406492686876,-15.763073901338192],[-47.871962075001086,-15.771416620456055],[-47.871747498279895,-15.775835644568444],[-47.86586809611925,-15.775133563058382],[-47.8660397574962,-15.771953516373763],[-47.86410856700548,-15.771375320711222],[-47.85968828654894,-15.771581819351308],[-47.85440969920763,-15.76869081926306],[-47.85462427592882,-15.762235941089967],[-47.85509634471544,-15.761203398235875],[-47.85689878917345,-15.761162096412473],[-47.860246186024035,-15.760294756179908],[-47.861748223072375,-15.762566353694035],[-47.8645806357921,-15.76306197159169],[-47.87119890821016,-15.755406637151475],[-47.87269163585314,-15.752665672017788]] | Urbana       |

Cenário: Cadastro com sucesso
    Quando eu acessar a pagina dos imoveis
    Então eu vou cadastrar o imovel no territorio criado
    | código | versão | tipo_de_imovel | logradouro                          | número | sequência | complemento | ponto_de_referência | cep       | polígono                                                                                                                                                                                                                                                                                         | lado_do_quarteirão |
    | 1      | 1      | ALDEIA         | Faculdade de Ciências da Saúde (FS) | 10     | 1         | 1           | nenhum              | 70297-400 | [[-15.76749540860986,-47.86690056324006],[-15.768145891053692,-47.867758870124824],[-15.768693120700888,-47.867780327796936],[-15.770469025615412,-47.86647140979767],[-15.768971897500876,-47.86576330661774],[-15.767815487533298,-47.86598861217499],[-15.76749540860986,-47.86690056324006]] | 125                |

Esquema do Cenário: Excluir um imóvel
    Então eu vou excluir o imovel que possui logradouro igual a "<logradouro>"

Exemplos:
| logradouro                          |
| Faculdade de Ciências da Saúde (FS) |

Cenário: Excluir as dependencias de forma explicita (territorio)
    Então irei excluir as dependencias