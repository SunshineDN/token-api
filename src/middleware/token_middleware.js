const jwt = require('jsonwebtoken');
const { secret } = require('../config/index.js');

module.exports = (req, res, next) => {
  const bearer = req.headers['authorization'];
  const token = bearer.split(' ')[1];
  console.log('Verificando token de acesso...');
  console.log(token);

  if (!token) {
    console.log('Token de acesso não informado!');
    return res.status(401).json({ message: 'Token de acesso não informado!' });
  } else {
    jwt.verify(token, secret, (err) => {
      if (err) {
        console.log('Sem autorização!');
        return res.status(401).json({ message: 'Sem autorização!' });
      } else {
        console.log('Token de acesso válido!');
        next();
      }
    });
  }
};
