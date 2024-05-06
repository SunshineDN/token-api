import jwo from 'jsonwebtoken';
import { secret } from '../config/index.js';

export const tokenMiddleware = (req, res, next) => {
  const req_id = req.body;
  const token = req.headers['authorization'];

  if (!token) {
    console.log('Token não informado!');
    return res.status(401).json({ message: 'Token não informado!' });
  } else {
    jwo.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log('Token inválido!');
        return res.status(401).json({ message: 'Token inválido!' });
      } else {
        if (decoded.id === req_id.id) {
          console.log('Token válido!');
          next();
        } else {
          console.log('Token inválido!');
          return res.status(401).json({ message: 'Token inválido!' });
        }
      }
    });
  }

};
