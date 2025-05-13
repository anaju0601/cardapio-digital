🥟 Cardápio Digital - Pastelaria Facul Digital

📄 Descrição do Projeto
Este é um projeto de um site de cardápio digital desenvolvido para a Pastelaria Facul Digital. O objetivo é substituir cardápios físicos por uma alternativa moderna, acessível e prática, permitindo que os clientes acessem o cardápio pelo celular ou qualquer dispositivo com internet. O site apresenta os sabores, descrições e preços dos nossos produtos de forma clara e visualmente agradável.

🎯 Objetivo do Site
O principal objetivo do site é melhorar a experiência do cliente, facilitando o acesso ao cardápio da nossa pastelaria. Com um layout simples e responsivo, buscamos tornar a escolha dos pastéis mais fácil e rápida, além de modernizar a forma como apresentamos nossos produtos ao público.

🌐 URL de Acesso
Você pode acessar o site publicado em produção através do link:

👉 https://pastelaria-facul-digital.azurewebsites.net/

⚙️ Descrição dos Pipelines (CI/CD)
Este projeto conta com duas configurações de automação via GitHub Actions:

Pipeline de Integração Contínua (CI):
A primeira configuração define uma pipeline de integração contínua (CI) que é executada sempre que há um push na branch main. Ela faz o checkout do repositório, configura o Node.js na versão 20, instala as dependências e o Cypress, inicia um servidor local, executa os testes com Cypress e realiza uma análise de código com o SonarQube. No final, utiliza a imagem Docker publicada para fazer o deploy da aplicação no Azure.

Pipeline de Entrega Contínua (CD):
A segunda configuração define uma pipeline de entrega contínua (CD), também acionada por push na branch main. Ela faz o checkout do código, realiza login no Docker Hub, constrói e envia a imagem Docker do projeto para o Docker Hub e, em seguida, faz o deploy dessa imagem no Azure App Service, garantindo que a versão mais recente esteja em produção.
