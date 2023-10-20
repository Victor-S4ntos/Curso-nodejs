import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(valida, resultado) {
  if (valida) {
    console.log(
      chalk.yellow('lista validada'),
      await listaValidada(resultado));    
  } else {
    console.log(
      chalk.yellow('lista de links'),resultado);
  }
}

async function processaTexto(argumentos) {
  const caminhoParaOsLinks = argumentos[2];
  console.log(caminhoParaOsLinks);
  const valida = argumentos[3] === '--valida';

  try {
    fs.lstatSync(caminhoParaOsLinks);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('arquivo ou diretório não existe');
      return;
    }
  }

  if (fs.lstatSync(caminhoParaOsLinks).isFile()) {
    const resultado = await pegaArquivo(caminhoParaOsLinks);
    imprimeLista(valida, resultado);
  }

  console.log(caminhoParaOsLinks);
}

processaTexto(caminho);