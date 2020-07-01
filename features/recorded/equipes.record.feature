#language:pt

@Record
Funcionalidade: Gravar requisições http para criação e exclusão de Equipes

@Blaze
Cenário: Login no BlazeMeter e inicio da gravação
    Dado que eu desejo obter um script de carga para a funcionalidade "equipes"
    Então eu inicio uma gravação do BlazeMeter

@NeedLogin
Esquema do Cenário: Cadastro com sucesso
    Quando eu acessar a pagina das equipes
    Então eu vou cadastrar a equipe "<nome_da_equipe>"
    E adicionar os usuarios a equipe "<nome_da_equipe>"
    | nome      | cargo      |
    | Usuário 3 | supervisor |
    | Usuário 1 | agente     |
    | Usuário 2 | agente     |

Exemplos:
| nome_da_equipe |
| __Equipe_0__   |

@NeedLogin
Esquema do Cenário: Desvincular usuarios de uma equipe
    Quando eu acessar a pagina das equipes
    Então eu irei desvincular os usuarios da equipe "<nome_da_equipe>"
    | nome      |
    | Usuário 2 |

Exemplos:
| nome_da_equipe |
| __Equipe_0__   |

@NeedLogin
Esquema do Cenário: Excluir uma equipe
    Quando eu acessar a pagina das equipes
    Então eu vou excluir a equipe "<nome_da_equipe>"

Exemplos:
| nome_da_equipe |
| __Equipe_0__   |

@Blaze
Cenário: TearDown
    Então paro a gravação do BlazeMeter