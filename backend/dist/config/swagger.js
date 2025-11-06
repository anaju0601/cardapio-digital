"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path")); // <-- IMPORTANTE: Importar o 'path'
const fs_1 = __importDefault(require("fs")); // <-- IMPORTANTE: Importar o 'fs' (File System)
// -----------------------------------------------------------
// 🚀 INÍCIO DA CORREÇÃO ROBUSTA
// -----------------------------------------------------------
// 1. Define o caminho para a pasta 'dist'
const distPath = path_1.default.join(process.cwd(), 'dist');
// 2. Verifica se a pasta 'dist' existe.
// Esta é a forma mais fiável de saber se estamos em produção.
const isProduction = fs_1.default.existsSync(distPath);
// 3. Define os caminhos dos arquivos de API com base no ambiente
// Usamos **/*.ts (glob recursivo) para encontrar ficheiros em subpastas.
const apiFiles = isProduction
    ? [
        path_1.default.join(distPath, './routes/**/*.js'), // Em produção, leia os arquivos JS compilados
        path_1.default.join(distPath, './controllers/**/*.js'),
    ]
    : [
        path_1.default.join(process.cwd(), './src/routes/**/*.ts'), // Em desenvolvimento, leia os arquivos TS
        path_1.default.join(process.cwd(), './src/controllers/**/*.ts'),
    ];
// 4. Define os servidores
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
];
// -----------------------------------------------------------
// 🚀 FIM DA CORREÇÃO
// -----------------------------------------------------------
const swaggerDefinition = {
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
};
const options = {
    swaggerDefinition,
    apis: apiFiles, // <-- Usa a nossa variável de caminhos corrigida
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
