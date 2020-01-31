      #language:pt

      Funcionalidade: Cadastrar uma equipe

      Cenário: Cadastro com sucesso
      Dado que estou logado com
      | cpf            | senha    |
      | 111.111.111-11 | 12345678 |
      Quando eu acessar a pagina das equipes
      Então eu vou cadastrar a equipe "Time 8"
      E adicionar os usuarios
      | nome      | role       |
      | Usuário 1 | agente     |
      | Usuário 2 | supervisor |