#language:pt

@Record
Funcionalidade: Gravar requisições http para criação e exclusão de Territórios

@Blaze
Cenário: Login no BlazeMeter e inicio da gravação
    Dado que eu desejo obter um script de carga para a funcionalidade "territorios"
    Então eu inicio uma gravação do BlazeMeter

@NeedLogin
Cenário: Cadastro com sucesso
    Quando eu acessar a pagina dos territorios
    Então eu vou cadastrar o territorio
    | tipo_de_territorio | nome | polígono                                                                                                                                                                                                                                                                                                                             | tipo_de_zona |
    | BAIRRO             | CEU  | [[-47.85867742158287,-15.76523781311726],[-47.85693935014122,-15.76521716261706],[-47.85669258691185,-15.765165536357383],[-47.85662821389549,-15.7660018801472],[-47.857518707288435,-15.766094807022201],[-47.85791567422264,-15.766404562964874],[-47.85883835412376,-15.76553724513392],[-47.85867742158287,-15.76523781311726]] | Urbana       |

@NeedLogin
Esquema do Cenário: Excluir um territorio
    Quando eu acessar a pagina dos territorios
    Então eu vou excluir o territorio que possui nome igual a "<nome>"

Exemplos:
| nome |
| CEU  |

@Blaze
Cenário: TearDown
    Então paro a gravação do BlazeMeter