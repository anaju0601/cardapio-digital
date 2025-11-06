"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const userRepository = database_1.AppDataSource.getRepository(User_1.User);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
class AuthController {
    async register(req, res) {
        try {
            const { email, password, name } = req.body;
            const existingUser = await userRepository.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email já cadastrado" });
            }
            const user = userRepository.create({ email, password, name });
            await userRepository.save(user);
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "7d",
            });
            return res.status(201).json({
                message: "Usuário criado com sucesso",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            });
        }
        catch (error) {
            console.error("Register error:", error);
            return res.status(500).json({ message: "Erro ao criar usuário" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userRepository.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "7d",
            });
            return res.json({
                message: "Login realizado com sucesso",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            });
        }
        catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ message: "Erro ao fazer login" });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            });
        }
        catch (error) {
            console.error("Get profile error:", error);
            return res.status(500).json({ message: "Erro ao buscar perfil" });
        }
    }
}
exports.AuthController = AuthController;
