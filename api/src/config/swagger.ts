import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestão Acadêmica",
      version: "1.0.0",
      description:
        "API Backend para Sistema de Gestão Acadêmica - Cadastro e gerenciamento de professores, disciplinas e horários",
      contact: {
        name: "Suporte API",
        email: "suporte@academico.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de Desenvolvimento",
      },
      {
        url: "https://api-academico.vercel.app",
        description: "Servidor de Produção",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token JWT obtido no login",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            email: {
              type: "string",
              format: "email",
            },
            name: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Professor: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            phone: {
              type: "string",
            },
            department: {
              type: "string",
            },
            specialization: {
              type: "string",
            },
            active: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Subject: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
            code: {
              type: "string",
            },
            workload: {
              type: "number",
            },
            description: {
              type: "string",
            },
            professorId: {
              type: "string",
              format: "uuid",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Schedule: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            dayOfWeek: {
              type: "string",
              enum: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            },
            startTime: {
              type: "string",
              example: "08:00",
            },
            endTime: {
              type: "string",
              example: "10:00",
            },
            classroom: {
              type: "string",
            },
            subjectId: {
              type: "string",
              format: "uuid",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
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
  },
  apis: ["./src/routes/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)
