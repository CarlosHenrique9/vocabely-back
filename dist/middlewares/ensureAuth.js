"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthViaQuery = exports.ensureAuth = void 0;
const jwtService_1 = require("../services/jwtService");
const userService_1 = require("../services/userService");
function ensureAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        console.error('Erro de autenticação: nenhum token encontrado no cabeçalho');
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
    }
    const token = authorizationHeader.replace(/Bearer\s/, '');
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            console.error('Erro de autenticação: token inválido', err);
            return res.status(401).json({ message: 'Não autorizado: token inválido' });
        }
        console.log('Token decodificado:', decoded);
        userService_1.userService.findByEmail(decoded.email)
            .then(user => {
            if (!user) {
                console.error('Erro de autenticação: usuário não encontrado', decoded.email);
                return res.status(401).json({ message: 'Não autorizado: usuário não encontrado' });
            }
            req.user = user;
            next();
        })
            .catch(error => {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        });
    });
}
exports.ensureAuth = ensureAuth;
function ensureAuthViaQuery(req, res, next) {
    const { token } = req.query;
    if (!token) {
        console.error('Erro de autenticação: nenhum token encontrado na query');
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
    }
    if (typeof token !== 'string') {
        console.error('Erro de autenticação: o parâmetro token deve ser do tipo string');
        return res.status(400).json({ message: 'O parâmetro token deve ser do tipo string' });
    }
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            console.error('Erro de autenticação: token inválido', err);
            return res.status(401).json({ message: 'Não autorizado: token inválido' });
        }
        console.log('Token decodificado:', decoded);
        userService_1.userService.findByEmail(decoded.email)
            .then(user => {
            if (!user) {
                console.error('Erro de autenticação: usuário não encontrado', decoded.email);
                return res.status(401).json({ message: 'Não autorizado: usuário não encontrado' });
            }
            req.user = user;
            next();
        })
            .catch(error => {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        });
    });
}
exports.ensureAuthViaQuery = ensureAuthViaQuery;
//# sourceMappingURL=ensureAuth.js.map