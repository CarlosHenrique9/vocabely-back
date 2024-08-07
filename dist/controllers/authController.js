"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const userService_1 = require("../services/userService");
const jwtService_1 = require("../services/jwtService");
exports.authController = {
    // POST /auth/register
    register: async (req, res) => {
        const { firstName, lastName, phone, birth, email, password } = req.body;
        try {
            const userAlreadyExists = await userService_1.userService.findByEmail(email);
            if (userAlreadyExists) {
                throw new Error('Este e-mail já está cadastrado.');
            }
            const user = await userService_1.userService.create({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: 'user',
            });
            return res.status(201).json(user);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // POST /auth/login
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await userService_1.userService.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'E-mail não registrado' });
            }
            user.checkPassword(password, (err, isSame) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                if (!isSame) {
                    return res.status(401).json({ message: 'Senha incorreta' });
                }
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                };
                const token = jwtService_1.jwtService.signToken(payload, '7d');
                return res.json({ authenticated: true, ...payload, token });
            });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
};
//# sourceMappingURL=authController.js.map