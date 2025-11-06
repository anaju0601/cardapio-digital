"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./config/database");
const swagger_1 = require("./config/swagger");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://black-cliff-09ef7270f.3.azurestaticapps.net",
    process.env.FRONTEND_URL || ""
].filter(Boolean);
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
// -----------------------------------------------------------
// 🚀 INÍCIO DA CORREÇÃO
// -----------------------------------------------------------
// Diz ao Express para confiar no proxy reverso do Azure
// Isto corrige problemas de 'mixed content' (HTTP/HTTPS) no Swagger
app.set("trust proxy", 1);
// -----------------------------------------------------------
// 🚀 FIM DA CORREÇÃO
// -----------------------------------------------------------
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use(error_middleware_1.errorHandler);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, "0.0.0.0", () => {
        // No Azure, process.env.WEBSITE_HOSTNAME será o URL correto
        const hostname = process.env.WEBSITE_HOSTNAME || `localhost:${PORT}`;
        // O log do Swagger estava a mostrar https incorretamente, vamos usar o protocolo correto
        // O 'trust proxy' vai corrigir como o Swagger se apresenta
        console.log(`🚀 Server running at http://${hostname}`);
        console.log(`📘 Swagger docs available at http://${hostname}/api-docs`);
        console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}`);
    });
})
    .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
});
exports.default = app;
