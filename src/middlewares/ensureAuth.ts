import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserInstance } from '../models/User';
import { jwtService } from '../services/jwtService';
import { userService } from '../services/userService';

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    console.error('Erro de autenticação: nenhum token encontrado no cabeçalho');
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
  }

  const token = authorizationHeader.replace(/Bearer\s/, '');

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      console.error('Erro de autenticação: token inválido', err);
      return res.status(401).json({ message: 'Não autorizado: token inválido' });
    }

    console.log('Token decodificado:', decoded);

    userService.findByEmail((decoded as JwtPayload).email)
      .then(user => {
        if (!user) {
          console.error('Erro de autenticação: usuário não encontrado', (decoded as JwtPayload).email);
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

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { token } = req.query;

  if (!token) {
    console.error('Erro de autenticação: nenhum token encontrado na query');
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
  }

  if (typeof token !== 'string') {
    console.error('Erro de autenticação: o parâmetro token deve ser do tipo string');
    return res.status(400).json({ message: 'O parâmetro token deve ser do tipo string' });
  }

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      console.error('Erro de autenticação: token inválido', err);
      return res.status(401).json({ message: 'Não autorizado: token inválido' });
    }

    console.log('Token decodificado:', decoded);

    userService.findByEmail((decoded as JwtPayload).email)
      .then(user => {
        if (!user) {
          console.error('Erro de autenticação: usuário não encontrado', (decoded as JwtPayload).email);
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
