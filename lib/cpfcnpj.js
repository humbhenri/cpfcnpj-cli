
"use strict";


const program = require("commander");
const cpfcnpj = require("cpf_cnpj");
const clipboardy = require("clipboardy");

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
            var cpf = cpfcnpj.CPF.generate();
            console.log(cpf);
            clipboardy.writeSync(cpf);
        }

        if (program.cnpj) {
            var cnpj = cpfcnpj.CNPJ.generate();
            console.log(cnpj);
            clipboardy.writeSync(cnpj);
        }

        if (program.verify_cpf) {
            console.log(cpfcnpj.CPF.isValid(program.verify_cpf) ? "Valid" : "Invalid");
        }

        if (program.verify_cnpj) {
            console.log(cpfcnpj.CNPJ.isValid(program.verify_cnpj) ? "Valid" : "Invalid");
        }

    }
}