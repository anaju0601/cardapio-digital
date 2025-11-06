# 🔒 Política de Segurança

## Versões Suportadas

Atualmente, estamos fornecendo atualizações de segurança para as seguintes versões:

| Versão | Suportada          |
| ------ | ------------------ |
| 0.1.x  | ✅ Sim             |
| < 0.1  | ❌ Não             |

## 🚨 Reportando uma Vulnerabilidade

A segurança do Cardápio Digital é levada muito a sério. Se você descobrir uma vulnerabilidade de segurança, por favor, siga estas diretrizes:

### ⚠️ NÃO

- ❌ Abra uma issue pública sobre a vulnerabilidade
- ❌ Divulgue a vulnerabilidade publicamente antes de ser corrigida
- ❌ Explore a vulnerabilidade além do necessário para demonstrá-la

### ✅ FAÇA

1. **Reporte Privadamente**
   - Envie um email para: [seu-email@exemplo.com]
   - Ou use a funcionalidade de Security Advisories do GitHub

2. **Inclua Detalhes**
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Versão afetada
   - Sugestões de correção (se houver)

3. **Aguarde Resposta**
   - Você receberá uma confirmação em até 48 horas
   - Trabalharemos com você para entender e resolver o problema
   - Manteremos você informado sobre o progresso

### 📋 Template de Report

\`\`\`markdown
**Tipo de Vulnerabilidade**
[Ex: XSS, SQL Injection, CSRF, etc.]

**Descrição**
[Descrição detalhada da vulnerabilidade]

**Passos para Reproduzir**
1. [Primeiro passo]
2. [Segundo passo]
3. [...]

**Impacto**
[Qual o impacto potencial desta vulnerabilidade?]

**Versão Afetada**
[Qual versão do software está afetada?]

**Ambiente**
- SO: [Ex: Ubuntu 22.04]
- Navegador: [Ex: Chrome 120]
- Node.js: [Ex: 20.10.0]

**Prova de Conceito**
[Código ou screenshots demonstrando a vulnerabilidade]

**Sugestões de Correção**
[Se você tiver sugestões de como corrigir]
\`\`\`

## 🛡️ Processo de Resposta

1. **Confirmação** (0-48h)
   - Confirmamos o recebimento do report
   - Avaliação inicial da severidade

2. **Investigação** (2-7 dias)
   - Reproduzimos a vulnerabilidade
   - Avaliamos o impacto completo
   - Desenvolvemos uma correção

3. **Correção** (7-30 dias)
   - Implementamos a correção
   - Testamos extensivamente
   - Preparamos o patch

4. **Divulgação** (após correção)
   - Lançamos a versão corrigida
   - Publicamos um security advisory
   - Creditamos o descobridor (se desejado)

## 🏆 Reconhecimento

Agradecemos aos seguintes pesquisadores de segurança por reportarem vulnerabilidades de forma responsável:

<!-- Lista será atualizada conforme necessário -->
- Nenhum report até o momento

## 🔐 Melhores Práticas de Segurança

### Para Desenvolvedores

- ✅ Sempre valide e sanitize inputs do usuário
- ✅ Use HTTPS em produção
- ✅ Mantenha dependências atualizadas
- ✅ Implemente rate limiting em APIs
- ✅ Use variáveis de ambiente para secrets
- ✅ Implemente CSP (Content Security Policy)
- ✅ Use autenticação e autorização adequadas

### Para Usuários

- ✅ Mantenha o software atualizado
- ✅ Use senhas fortes e únicas
- ✅ Habilite autenticação de dois fatores quando disponível
- ✅ Não compartilhe credenciais
- ✅ Revise permissões de acesso regularmente

## 📚 Recursos de Segurança

### Dependências

Usamos ferramentas automatizadas para monitorar vulnerabilidades:

- **Dependabot** - Atualizações automáticas de segurança
- **npm audit** - Verificação de vulnerabilidades
- **Snyk** - Monitoramento contínuo

### Auditorias

\`\`\`bash
# Verificar vulnerabilidades nas dependências
npm audit

# Corrigir vulnerabilidades automaticamente
npm audit fix

# Ver relatório detalhado
npm audit --json
\`\`\`

## 🔄 Atualizações de Segurança

Atualizações de segurança são lançadas assim que possível após a descoberta de uma vulnerabilidade. Recomendamos:

- 🔔 Ativar notificações do GitHub para este repositório
- 📧 Assinar releases para receber notificações
- 🔄 Atualizar regularmente para a versão mais recente

## 📞 Contato

Para questões de segurança:
- **Email**: [seu-email@exemplo.com]
- **GitHub Security**: Use a aba Security deste repositório

Para outras questões:
- Abra uma issue normal no GitHub
- Consulte o [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Nota**: Esta política de segurança está sujeita a mudanças. Última atualização: Janeiro 2025
