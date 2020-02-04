#language:pt

Funcionalidade: Cadastrar uma equipe

Contexto:
    Dado que estou logado com
    | cpf            | senha    |
    | 111.111.111-11 | 12345678 |

Esquema do Cenário: Cadastro com sucesso
    Quando eu acessar a pagina das equipes
    Então eu vou cadastrar a equipe "<nome_da_equipe>"
    Então adicionar os usuarios a equipe "<nome_da_equipe>"
    | nome      | cargo      |
    | Usuário 3 | supervisor |
    | Usuário 1 | agente     |
    | Usuário 2 | supervisor |

Exemplos:
| nome_da_equipe  |
| Time 7          |
| Turma do Pagode |
| Exalta samba    |