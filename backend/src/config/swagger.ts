import swaggerJsdoc from "swagger-jsdoc"
import type { SwaggerDefinition } from "swagger-jsdoc"
import path from "path" // <-- IMPORTANTE: Importar o 'path'

// -----------------------------------------------------------
// 🚀 INÍCIO DA CORREÇÃO
// -----------------------------------------------------------

// 1. Verifica se estamos em ambiente de produção
const isProduction = process.env.NODE_ENV === 'production'

// 2. Define os caminhos dos arquivos de API com base no ambiente
// Usamos path.join(process.cwd(), ...) para garantir que o caminho
// esteja correto, relativo à pasta /app (onde o processo corre).
const apiFiles = isProduction
  ? [
      path.join(process.cwd(), './dist/routes/*.js'), // Em produção, leia os arquivos JS compilados
      path.join(process.cwd(), './dist/controllers/*.js'),
    ]
  : [
      path.join(process.cwd(), './src/routes/*.ts'), // Em desenvolvimento, leia os arquivos TS
      path.join(process.cwd(), './src/controllers/*.ts'),
    ]

// 3. Define os servidores (agora com o seu URL real do Azure)
const servers = [
  {
    url: "http://localhost:3001",
    description: "Servidor de Desenvolvimento",
  },
  {
    // Usando o seu URL real do backend do Azure
    url: "https://cardapio-api-bygeddb7fwbph8gp.eastus2-01.azurewebsites.net",
    description: "Servidor de Produção (Azure)",
  },
]

// -----------------------------------------------------------
// 🚀 FIM DA CORREÇÃO
// -----------------------------------------------------------

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Cardápio Digital API",
    version: "1.0.0",
    description: "API REST para gerenciamento de cardápio digital com autenticação JWT",
    contact: {
      name: "API Support",
      email: "support@cardapio.com",
    },
  },
  servers: servers, // <-- Usa a nossa variável de servidores corrigida
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Insira o token JWT no formato: Bearer {token}",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid", description: "ID único do usuário" },
          email: { type: "string", format: "email", description: "Email do usuário" },
          name: { type: "string", description: "Nome do usuário" },
          role: { type: "string", enum: ["user", "admin"], description: "Papel do usuário no sistema" },
          createdAt: { type: "string", format: "date-time", description: "Data de criação" },
          updatedAt: { type: "string", format: "date-time", description: "Data de atualização" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid", description: "ID único da categoria" },
          name: { type: "string", description: "Nome da categoria" },
          description: { type: "string", description: "Descrição da categoria" },
          imageUrl: { type: "string", format: "uri", description: "URL da imagem da categoria" },
          createdAt: { type: "string", format: "date-time", description: "Data de criação" },
          updatedAt: { type: "string", format: "date-time", description: "Data de atualização" },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid", description: "ID único do produto" },
          name: { type: "string", description: "Nome do produto" },
          description: { type: "string", description: "Descrição do produto" },
          price: { type: "number", format: "decimal", description: "Preço do produto" },
          imageUrl: { type: "string", format: "uri", description: "URL da imagem do produto" },
          available: { type: "boolean", description: "Disponibilidade do produto" },
          categoryId: { type: "string", format: "uuid", description: "ID da categoria do produto" },
          createdAt: { type: "string", format: "date-time", description: "Data de criação" },
          updatedAt: { type: "string", format: "date-time", description: "Data de atualização" },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", description: "Mensagem de erro" },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: apiFiles, // <-- Usa a nossa variável de caminhos corrigida
}

export const swaggerSpec = swaggerJsdoc(options)