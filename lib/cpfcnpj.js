"use strict";

const program = require("commander");
const clipboardy = require("clipboardy");

function generateRandomCPF() {
  let cpf = '';
  for (let i=0; i<9; i++) {
    cpf += getRandomIntInclusive(0, 9);
  }
  return cpf + generateVerifierDigits(cpf);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateVerifierDigits(cpf) {
  let sum = 0;
  for (let i=0; i<9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let first = sum % 11;
  first = 11 - first;
  if (first >= 10) {
    first = 0;
  }
  const newCpf = cpf + String(first);
  sum = 0;
  for (let i=0; i<10; i++) {
    sum += parseInt(newCpf[i]) * (11 - i);
  }
  let second = sum % 11;
  second = 11 - second;
  if (second >= 10) {
    second = 0;
  }
  return first + '' + second;
}

function isValidCPF(input) {
  let cpf = input.replace(/\D/g, '');
  if (cpf.length != 11) {
    return false;
  }
  if (new Set(cpf).size === 1) {
    return false;
  }
  return generateVerifierDigits(cpf.slice(0, 9)) === cpf.slice(-2)
}

function generateRandomCNPJ() {
  let cnpj = '';
  for (let i=0; i<12; i++) {
    cnpj += getRandomIntInclusive(0, 9);
  }
  return cnpj + generateCNPJVerifierDigits(cnpj);
}

function generateCNPJVerifierDigits(cnpj) {
  let sum = 0;
  for (let i=11, w=2; i>=0; i--,w++) {
    if (w>9) {
      w=2;
    }
    sum += parseInt(cnpj[i]) * w;
  }
  let first = sum % 11;
  first = 11 - first;
  if (first >= 10) {
    first = 0;
  }
  let newCnpj = cnpj + String(first);

  sum = 0;
  for (let i=12, w=2; i>=0; i--,w++) {
    if (w>9) {
      w=2;
    }
    sum += parseInt(newCnpj[i]) * w;
  }
  let second = sum % 11;
  second = 11 - second;
  if (second >= 10) {
    second = 0;
  }
  return first + '' + second;
}

function isValidCNPJ(input) {
  let cnpj = input.replace(/\D/g, '');
  if (cnpj.length != 14) {
    return false;
  }
  if (new Set(cnpj).size === 1) {
    return false;
  }
  return generateCNPJVerifierDigits(cnpj.slice(0, 12)) === cnpj.slice(-2)
}

module.exports = {

  cliMain: function (args) {
    args = args || process.argv;

    program
      .usage("[options]")
      .option("-f, --cpf", "generate a CPF number")
      .option("-j, --cnpj", "generate a CNPJ number")
      .option("-v, --verify_cpf [cpf]", "verify CPF given as argument")
      .option("-V, --verify_cnpj [cnpj]", "verify CNPJ given as argument")
      .parse(args);

    program._name = "cpfcnpj";

    if (!process.argv.slice(2).length) {
      program.outputHelp();
    }

    if (program.cpf) {
      const cpf = generateRandomCPF();
      console.log(cpf);
      clipboardy.writeSync(cpf);
    }

    if (program.cnpj) {
      const cnpj = generateRandomCNPJ();
      console.log(cnpj);
      clipboardy.writeSync(cnpj);
    }

    if (program.verify_cpf) {
      console.log(isValidCPF(program.verify_cpf) ? "Valid" : "Invalid");
    }

    if (program.verify_cnpj) {
      console.log(isValidCNPJ(program.verify_cnpj) ? "Valid" : "Invalid");
    }

  }
}
