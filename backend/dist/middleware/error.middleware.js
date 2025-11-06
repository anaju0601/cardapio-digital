"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    return res.status(500).json({
        message: "Erro interno do servidor",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
};
exports.errorHandler = errorHandler;
