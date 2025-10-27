import swaggerJsdoc from "swagger-jsdoc"
import type { SwaggerDefinition } from "swagger-jsdoc"

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
  servers: [
    {
      url: "http://localhost:3001",
      description: "Servidor de Desenvolvimento",
    },
    {
      url: "https://api.cardapio.com",
      description: "Servidor de Produção",
    },
  ],
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
          id: {
            type: "string",
            format: "uuid",
            description: "ID único do usuário",
          },
          email: {
            type: "string",
            format: "email",
            description: "Email do usuário",
          },
          name: {
            type: "string",
            description: "Nome do usuário",
          },
          role: {
            type: "string",
            enum: ["user", "admin"],
            description: "Papel do usuário no sistema",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Data de criação",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Data de atualização",
          },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "ID único da categoria",
          },
          name: {
            type: "string",
            description: "Nome da categoria",
          },
          description: {
            type: "string",
            description: "Descrição da categoria",
          },
          imageUrl: {
            type: "string",
            format: "uri",
            description: "URL da imagem da categoria",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Data de criação",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Data de atualização",
          },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "ID único do produto",
          },
          name: {
            type: "string",
            description: "Nome do produto",
          },
          description: {
            type: "string",
            description: "Descrição do produto",
          },
          price: {
            type: "number",
            format: "decimal",
            description: "Preço do produto",
          },
          imageUrl: {
            type: "string",
            format: "uri",
            description: "URL da imagem do produto",
          },
          available: {
            type: "boolean",
            description: "Disponibilidade do produto",
          },
          categoryId: {
            type: "string",
            format: "uuid",
            description: "ID da categoria do produto",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Data de criação",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Data de atualização",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Mensagem de erro",
          },
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
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)
