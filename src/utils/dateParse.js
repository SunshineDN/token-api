export default (data) => {
  try {
    if (data) {
      console.log('Entrando no dateParse() com parâmetro');
      const dataString = new Date(data).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      console.log('dataString:');
      console.log(dataString);
      // const [dataParte, horaParte] = dataString.split(', '); //Caso não funcione na data do banco de dados
      const [dataParte, horaParte] = dataString.split(' '); //Caso o anterior esteja retornando undefined no array

      // Reformatar a data para o formato ISO 8601
      console.log('Depois que splitar, ficará assim:');
      console.log(dataParte, horaParte);
      const [dia, mes, ano] = dataParte.split('/');
      const [hora, minutos, segundos] = horaParte.split(':');
      let dataISO8601 = `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
      dataISO8601 = dataISO8601.replace(/,/g, '');
      console.log('dataISO8601:');
      console.log(dataISO8601);

      // Converter a data para milissegundos
      const milissegundos = Date.parse(dataISO8601);
      console.log('Saindo do dateParse() com parâmetro');
      return milissegundos;

    } else {
      console.log('Entrando no dateParse() sem parâmetro');
      const dataString = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      console.log('dataString:');
      console.log(dataString);
      // const [dataParte, horaParte] = dataString.split(', '); //Caso não funcione na data do banco de dados
      const [dataParte, horaParte] = dataString.split(' '); //Caso o anterior esteja retornando undefined no array

      // Reformatar a data para o formato ISO 8601
      console.log('Depois que splitar, ficará assim:');
      console.log(dataParte, horaParte);
      const [dia, mes, ano] = dataParte.split('/');
      const [hora, minutos, segundos] = horaParte.split(':');
      let dataISO8601 = `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
      dataISO8601 = dataISO8601.replace(/,/g, '');
      console.log('dataISO8601:');
      console.log(dataISO8601);

      // Converter a data para milissegundos
      const milissegundos = Date.parse(dataISO8601);
      console.log('Saindo do dateParse() sem parâmetro');
      return milissegundos;
    }
  } catch (error) {
    console.log('\nErro no método dateParse():');
    console.log(error);
    throw new Error(error);
  }
};
