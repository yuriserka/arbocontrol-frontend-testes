#language:pt

Funcionalidade: Exportar um script no formato JMX
    Como é necessário avaliar o sistema em partes, a geração de testes de carga
    para determinadas funcionalidades é de grande utiliadade.

Cenário: Exportação de um relátório sem funcionalidade atribuída
    Dado que a extensão do Blaze Meter está instalada no Chrome
    Então abrirei uma nova aba
    Quando eu acessar a página de configuração "chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html"
    Então farei login com os dados disponibilizados
    Quando eu acionar o botão de gravação
    Então navegarei até o site "https://admin.arbocontrol.com/"
    E farei login
    Então acessarei novamente a página de configuração "chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html"
    E pararei a gravação
    E clicarei para salvar e o arquivo será exportado
