// const data = {
//   name: 'Agendamento',
//   access_token: 'Teste2',
//   refresh_token: 'Teste3',
//   expires_in: 3600,
//   token_type: 'Bearer'
// };

// const createToken = (data) => {
//   const { name, ...rest } = data;
//   console.log(name);
//   console.log({ name, ...rest});
// };

// createToken(data);

// const token_name = true;
// const client_id = false;
// const client_secret = false;

// if (!token_name || !client_id || !client_secret) {
//   console.log('Parâmetros inválidos!');
// } else {
//   console.log('Parâmetros válidos!');
// }

// import maskItem from './src/utils/maskItem.js';

// const item = 'b6bf244e-fd05-4157-a255-78c4f2be4a39';
// const mask = maskItem(item);
// console.log(item);
// console.log(mask);
// console.log(mask===item);

// const data1 = 1715018447000;
// // Data1 convertida para data
// const dateTest = new Date(data1).toTimeString();
// console.log(dateTest);

// // Data atual em ms
// const data2 = new Date().getTime();

// // Verificar se a diferença entre as datas é maior que 23 horas e 59 minutos
// const diffInMilliseconds = Math.abs(data2 - data1);
// const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
// const diffInHours = Math.floor(diffInMinutes / 60);

// if (diffInHours < 23 && diffInMinutes % 60 < 59) {
//   console.log('A diferença entre as datas é maior ou igual a 23 horas e 59 minutos.');
// } else {
//   console.log('A diferença entre as datas é menor que 23 horas e 59 minutos.');
// }

// Gerar um token de acesso;
// import jwt from 'jsonwebtoken';
// import { secret } from './src/config/index.js';
// import 'dotenv/config';

// // Token infinito
// const token = jwt.sign(process.env.ID, secret);
// console.log(token);

// // Verificar se o token é válido
// jwt.verify(token, secret, (err, decoded) => {
//   if (err) {
//     console.log('Token inválido!');
//   } else {
//     console.log(decoded);
//     console.log('Token válido!');
//   }
// });

const req = {
  headers: {
    host: 'api.aiatende.com.br',
  }
}

let { host } = req.headers;
host = `https://${host}`;

console.log(host);