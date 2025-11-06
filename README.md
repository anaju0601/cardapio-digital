# 🍽️ Cardápio Digital

Um sistema moderno e elegante de cardápio digital desenvolvido com Next.js 16, React 19 e Tailwind CSS v4. Perfeito para restaurantes, cafés e estabelecimentos que desejam oferecer uma experiência digital de qualidade aos seus clientes.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Características

- 🎨 **Interface Moderna**: Design responsivo e elegante com Tailwind CSS v4
- ⚡ **Performance Otimizada**: Construído com Next.js 16 e React 19
- 🌙 **Modo Escuro**: Suporte completo a temas claro e escuro
- 📱 **Mobile First**: Totalmente responsivo para todos os dispositivos
- ♿ **Acessível**: Componentes acessíveis com Radix UI
- 🎯 **TypeScript**: Tipagem completa para maior segurança
- 🚀 **Deploy Fácil**: Pronto para deploy na Vercel

## 🛠️ Tecnologias

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19.2](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática

### Estilização
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de temas

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast
- **[Recharts](https://recharts.org/)** - Gráficos e visualizações

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado), npm ou yarn

### Passos

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/anaju0601/cardapio-digital.git
cd cardapio-digital
\`\`\`

2. **Instale as dependências**
\`\`\`bash
pnpm install
# ou
npm install
# ou
yarn install
\`\`\`

3. **Execute o servidor de desenvolvimento**
\`\`\`bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
\`\`\`

4. **Abra no navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 🚀 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
pnpm dev          # Inicia o servidor de desenvolvimento

# Produção
pnpm build        # Cria build de produção
pnpm start        # Inicia servidor de produção

# Qualidade de Código
pnpm lint         # Executa o linter
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
cardapio-digital/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes UI (shadcn)
│   └── theme-provider.tsx # Provider de temas
├── hooks/                # Custom hooks
│   ├── use-mobile.ts     # Hook para detecção mobile
│   └── use-toast.ts      # Hook para toasts
├── lib/                  # Utilitários
│   └── utils.ts          # Funções auxiliares
├── public/               # Arquivos estáticos
├── next.config.mjs       # Configuração Next.js
├── tailwind.config.ts    # Configuração Tailwind
├── tsconfig.json         # Configuração TypeScript
└── package.json          # Dependências
\`\`\`

## 🎨 Componentes UI

O projeto utiliza uma biblioteca completa de componentes baseados em shadcn/ui:

- **Layout**: Card, Separator, Tabs, Accordion
- **Formulários**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Navegação**: Navigation Menu, Breadcrumb, Pagination
- **Feedback**: Alert, Toast, Dialog, Drawer, Progress
- **Dados**: Table, Calendar, Chart
- **Overlay**: Popover, Tooltip, Hover Card, Context Menu, Dropdown Menu
- **E muito mais...**

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anaju0601/cardapio-digital)

1. Faça push do código para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. A Vercel detectará automaticamente Next.js e configurará o build
4. Seu app estará online em minutos!

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud Run

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

## 👥 Autores

- **Ana Julia**, **Giovanni**, **Rafaela**, **Lucas** e **Augusto*

## 🙏 Agradecimentos

- [Vercel](https://vercel.com) - Hospedagem e ferramentas
- [shadcn](https://twitter.com/shadcn) - Componentes UI
- [Radix UI](https://www.radix-ui.com/) - Primitivos acessíveis
- Comunidade Next.js e React

## 📞 Suporte

Se você tiver alguma dúvida ou problema, por favor:

- Abra uma [issue](https://github.com/anaju0601/cardapio-digital/issues)
- Entre em contato através do GitHub

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/anaju0601">Ana Julia</a>
</div>
