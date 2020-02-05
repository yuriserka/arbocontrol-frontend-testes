#language:pt

Funcionalidade: Cadastrar uma equipe

Contexto:
    Dado que estou logado com
    | cpf            | senha    |
    | 111.111.111-11 | 12345678 |

Esquema do Cenário: Cadastro com sucesso
    Quando eu acessar a pagina das equipes
    Então eu vou cadastrar a equipe "<nome_da_equipe>"
    E adicionar os usuarios a equipe "<nome_da_equipe>"
    | nome      | cargo      |
    | Usuário 3 | supervisor |
    | Usuário 1 | agente     |
    | Usuário 2 | agente     |

Exemplos:
| nome_da_equipe  |
| Turma do Pagode |
| Time 7          |
| Exalta samba    |

Esquema do Cenário: Excluir uma equipe
    Quando eu acessar a pagina das equipes
    Então eu vou excluiur a equipe "<nome_da_equipe>"

Exemplos:
| nome_da_equipe  |
| Exalta samba    |
| Time 7          |

Esquema do Cenário: Desvincular usuarios de uma equipe
    Quando eu acessar a pagina das equipes
    Então eu irei desvincular os usuarios da equipe "<nome_da_equipe>"
    | nome      |
    | Usuário 2 |
    | Usuário 3 |

Exemplos:
| nome_da_equipe  |
| Turma do Pagode |