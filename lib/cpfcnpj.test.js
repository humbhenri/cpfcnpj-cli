const { generateRandomCPF, generateRandomCNPJ, isValidCPF, isValidCNPJ } = require('./cpfcnpj.js');

describe('generate cpf', () => {
  it ('valid', () => {
    const cpf = generateRandomCPF();
    expect(isValidCPF(cpf)).toBeTruthy();
  });
});

describe('generate cnpj', () => {
  it ('valid', () => {
    const cpf = generateRandomCNPJ();
    expect(isValidCNPJ(cpf)).toBeTruthy();
  });
});
