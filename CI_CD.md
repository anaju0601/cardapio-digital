# Guia CI/CD - GitHub Actions

## Visão Geral

O projeto utiliza GitHub Actions para automação de CI/CD com 4 workflows principais:

1. **CI (Integração Contínua)** - Testa e valida código
2. **CD (Entrega Contínua)** - Deploy automático
3. **Docker Publish** - Publica imagens Docker
4. **Tests** - Testes automatizados

## Workflows

### 1. CI - Integração Contínua

**Arquivo:** `.github/workflows/ci.yml`

**Quando executa:**
- Push para branches `main` ou `develop`
- Pull requests para `main` ou `develop`

**O que faz:**
- Testa backend (TypeScript, lint)
- Testa frontend (build, lint)
- Constrói imagens Docker

### 2. CD - Entrega Contínua

**Arquivo:** `.github/workflows/cd.yml`

**Quando executa:**
- Push para branch `main`

**O que faz:**
- Faz login no Docker Hub
- Constrói e publica imagens Docker
- Prepara deploy para produção

**Secrets necessários:**
- `DOCKER_USERNAME` - Usuário do Docker Hub
- `DOCKER_PASSWORD` - Senha/Token do Docker Hub

### 3. Docker Publish

**Arquivo:** `.github/workflows/docker-publish.yml`

**Quando executa:**
- Criação de releases
- Manualmente via workflow_dispatch

**O que faz:**
- Publica imagens no GitHub Container Registry
- Cria tags baseadas em versões semânticas

### 4. Tests

**Arquivo:** `.github/workflows/test.yml`

**Quando executa:**
- Push para branches `main` ou `develop`
- Pull requests

**O que faz:**
- Executa testes de integração
- Executa testes E2E
- Verifica saúde dos serviços

## Configuração

### Secrets do GitHub

Configure os seguintes secrets no repositório:

1. **DOCKER_USERNAME**
   - Vá em Settings > Secrets and variables > Actions
   - Clique em "New repository secret"
   - Nome: `DOCKER_USERNAME`
   - Valor: seu usuário do Docker Hub

2. **DOCKER_PASSWORD**
   - Nome: `DOCKER_PASSWORD`
   - Valor: token de acesso do Docker Hub

### Variáveis de Ambiente

As variáveis de ambiente são configuradas nos workflows:

\`\`\`yaml
env:
  DB_HOST: localhost
  DB_PORT: 5432
  DB_USER: postgres
  DB_PASSWORD: postgres
  DB_NAME: cardapio_test
  JWT_SECRET: test-secret
  NEXT_PUBLIC_API_URL: http://localhost:3001
\`\`\`

## Fluxo de Trabalho

### Desenvolvimento

1. Crie uma branch a partir de `develop`
2. Faça suas alterações
3. Commit e push
4. CI executa automaticamente
5. Crie Pull Request para `develop`

### Deploy para Produção

1. Merge de `develop` para `main`
2. CI executa testes
3. CD faz deploy automático
4. Imagens Docker são publicadas

## Badges

Adicione badges ao README.md:

\`\`\`markdown
![CI](https://github.com/seu-usuario/cardapio-digital/workflows/CI/badge.svg)
![CD](https://github.com/seu-usuario/cardapio-digital/workflows/CD/badge.svg)
\`\`\`

## Monitoramento

Acompanhe os workflows em:
- GitHub > Actions tab
- Notificações por email em caso de falha

## Troubleshooting

### Falha no build Docker

- Verifique se os Dockerfiles estão corretos
- Confirme que as dependências estão no package.json

### Falha nos testes

- Execute os testes localmente primeiro
- Verifique logs detalhados no GitHub Actions

### Falha no deploy

- Confirme que os secrets estão configurados
- Verifique permissões do token Docker

## Melhorias Futuras

- Adicionar testes unitários
- Implementar Cypress/Playwright para E2E
- Adicionar análise de código (SonarQube)
- Implementar deploy em cloud (AWS, Azure, GCP)
- Adicionar notificações Slack/Discord
