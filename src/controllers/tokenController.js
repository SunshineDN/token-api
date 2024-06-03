const axios = require('axios');
const Token = require('../models/token.js');
const dateParse = require('../utils/dateParse.js');

/*
  Exemplo de requisição:

  req.headers = {
    host: 'api.aiatende.com.br'
  }

  req.body = {
    account_id: 1,
    subdomain: 'api',
    client_id: '123',
    client_secret: '123',
    client_code: '123',
    grant_type: 'authorization_code'
  }
*/
class TokenController {

  constructor() {
    this.getToken = this.getToken.bind(this);
    this.createToken = this.createToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.deleteToken = this.deleteToken.bind(this);
    this.dropTable = this.dropTable.bind(this);
  }

  async getToken(req, res) {
    let { host } = req.headers;
    host = `https://${host}`;
    // const host = "https://api.aiatende.com.br"

    const body = req.body;
    const { account_id } = body;
    body.host = host;
    console.log('Pegando token...');
    console.log('Body da requisição: ');
    console.log(body);
    try {
      if (!account_id) {
        throw new Error('ID da conta não fornecido!');
      }
      const token = await Token.findOne({ where: { account_id } });
      if (token) {
        console.log('Token encontrado!');
        const { access_token } = await this.verifyToken(token.account_id, host);
        res.status(200).json({ message: 'Token existe!', access_token });
      } else {
        if (!body.client_secret || !body.client_id || !body.grant_type || !body.client_code || !body.subdomain) {
          throw new Error('Dados faltando para criar novo token!');
        } else {
          console.log('Token não encontrado!\n');
          // console.log('Enviando body para criar novo token...');
          // console.log(body);
          const newToken = await this.createToken(body);
          res.status(201).json({ message: 'Token novo criado!', access_token: newToken });
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
    const { client_id, client_secret, host: redirect_uri, client_code: code, subdomain, account_id } = tokenBody;
    const bodyReq = { client_id, client_secret, redirect_uri, code, grant_type: 'authorization_code' };
    // console.log('Body da requisição');
    // console.log(bodyReq);
    try {
      const URL = `https://${subdomain}.kommo.com`;
      // console.log(`Enviando requisição para: ${URL} para pegar token...`);
      const { data: { access_token, refresh_token } } = await axios.post(`${URL}/oauth2/access_token`, bodyReq);
      console.log('Token recebido com sucesso...');
      console.log('Armazenando token no banco de dados...');
      console.log({ account_id, subdomain, client_id, client_secret, access_token, refresh_token })
      const token = await Token.create({ account_id, subdomain, client_id, client_secret, access_token, refresh_token });
      console.log('Token criado!\n');
      return token.access_token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(account_id, host) {
    console.log(`Verificando token com ID ${account_id}...`);
    const token = await Token.findByPk(account_id);
    const { access_token, refresh_token, updatedAt, client_id, client_secret, subdomain } = token;
    try {
      // console.log('Última atualização:');
      console.log(updatedAt);

      // console.log('Convertendo datas...');
      const dateOld = dateParse(updatedAt);
      // console.log(`Última atualização em milisegundos: ${dateOld}\n\n`);

      const dateNow = dateParse();
      // console.log(`Agora em milisegundos: ${dateNow}\n\n`);

      const diffInMilliseconds = Math.abs(dateNow - dateOld);
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);

      // console.log(`Diferença em milisegundos: ${diffInMilliseconds}`);
      // console.log(`Diferença em minutos: ${diffInMinutes % 60}`);
      // console.log(`Diferença em horas: ${diffInHours}\n\n`);

      if (diffInHours >= 23) { // Verifica se o token ainda é válido dentro de 23 horas
        console.log('Token expirado!\n Pegando novas chaves de acesso...');
        const URL = `https://${subdomain}.kommo.com`;
        const { data } = await axios.post(`${URL}/oauth2/access_token`, {
          client_id,
          client_secret,
          grant_type: 'refresh_token',
          refresh_token,
          redirect_uri: host
        });

        console.log('Atualizando token...');
        await Token.update({ access_token: data.access_token, refresh_token: data.refresh_token }, { where: { account_id } });
        console.log('Token atualizado!\n');
        return {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };

      } else {
        console.log('Token ainda válido!\n');
        return {
          access_token,
          refresh_token,
        };
      }
    } catch (error) {
      console.log('Erro ao verificar token:');
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteToken(req, res) {
    const { account_id } = req.body;
    try {
      const token = await Token.findOne({ where: { account_id } });
      if (token) {
        await Token.destroy({ where: { account_id } });
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