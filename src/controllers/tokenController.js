const axios = require('axios');
const Token = require('../models/token.js');
const { domain } = require('../config/database.js');
const dateParse = require('../utils/dateParse.js');
 class TokenController {

  constructor() {
    this.getToken = this.getToken.bind(this);
    this.createToken = this.createToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.deleteToken = this.deleteToken.bind(this);
    this.dropTable = this.dropTable.bind(this);
  }

  async getToken(req, res) {
    const body = req.body;
    const { client_id } = body;
    console.log('Pegando token...');
    try {
      if (!client_id) {
        throw new Error('Parâmetros inválidos!');
      }
      const token = await Token.findOne({ where: { client_id } });
      if (token) {
        console.log('Token encontrado!');
        const { access_token } = await this.verifyToken(token.client_id);
        res.status(200).json({ message: 'Token existe!', access_token });
      } else {
        if (!body.client_secret || !body.redirect_uri) {
          throw new Error('Parâmetros inválidos para criar novo token!');
        } else {
          console.log('Token não encontrado!');
          console.log('Enviando body para criar novo token...');
          console.log(body);
          const newToken = await this.createToken(body);
          res.status(201).json({ message: 'Token novo criado!', newToken });
        }
      }
    } catch (e) {
      console.error('Erro ao pegar token:');
      if (e.response) {
        console.error(e.response);
        res.status(400).json({ message: e.response.data });
      }
      console.error(e);
      res.status(400).json({ message: e.message });
    }
  }
  
  async createToken(tokenBody) {
    console.log('Criando token...');
    const { client_id, client_secret, redirect_uri, ...rest } = tokenBody;
    try {
      console.log(`Enviando requisição para: ${domain} para pegar token...`);
      console.log({ client_id, client_secret, redirect_uri, ...rest });
      const { data } = await axios.post(`${domain}/oauth2/access_token`, {
        client_id,
        client_secret,
        redirect_uri,
        ...rest
      });
      const token = await Token.create({ client_id, client_secret, redirect_uri, ...data });
      console.log('Token criado!\n');
      return token.access_token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(tokenId) {
    console.log(`Verificando token com ID ${tokenId}...`);
    const token = await Token.findByPk(tokenId);
    console.log('Token:');
    console.log(token.dataValues);
    const { access_token, refresh_token, expires_in, updatedAt, client_id, client_secret, redirect_uri } = token;
    console.log('Restante dos dados:');
    try {
      console.log('Última atualização:');
      console.log(updatedAt);

      console.log('Convertendo datas...');
      const dateOld = dateParse(updatedAt);
      console.log(`Última atualização em milisegundos: ${dateOld}\n\n`);

      const dateNow = dateParse();
      console.log(`Agora em milisegundos: ${dateNow}\n\n`);

      const diffInMilliseconds = Math.abs(dateNow - dateOld);
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);

      console.log(`Diferença em milisegundos: ${diffInMilliseconds}`);
      console.log(`Diferença em minutos: ${diffInMinutes % 60}`);
      console.log(`Diferença em horas: ${diffInHours}\n\n`);

      if (diffInHours >= 23) { // Verifica se o token ainda é válido dentro de 23 horas
        console.log('Token expirado!\n Pegando novas chaves de acesso...');
        const { data } = await axios.post(`${domain}/oauth2/access_token`, {
          client_id,
          client_secret,
          grant_type: 'refresh_token',
          refresh_token,
          redirect_uri
        });

        console.log('Atualizando token...');
        await Token.update({ access_token: data.access_token, refresh_token: data.refresh_token, expires_in: data.expires_in }, { where: { client_id } });
        console.log('Token atualizado!\n');
        return {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_in: data.expires_in
        };
        
      } else {
        console.log('Token ainda válido!\n');
        return {
          access_token,
          refresh_token,
          expires_in,
        };
      }
    } catch (error) {
      console.log('Erro ao verificar token:');
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteToken(req, res) {
    const { client_id } = req.body;
    try {
      const token = await Token.findOne({ where: { client_id } });
      if (token) {
        await Token.destroy({ where: { client_id } });
        res.status(200).json({ message: 'Token deletado com sucesso!' });
      } else {
        res.status(404).json({ message: 'Token não encontrado!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async dropTable(req, res) {
    try {
      await Token.drop();
      res.status(200).json({ message: 'Tabela deletada com sucesso!' });
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = new TokenController();