const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }
    
    async listarHeroi(id) {
        const dados = await this.obterDados();
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true);
       
        return dadosFiltrados;
    }   

    async obterDados() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
       
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
       await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
       return true;
    }

    async cadastrarHeroi(heroi) {
        const dados = await this.obterDados();
        const id = heroi.id <= 2 ? heroi.id : Date.now();

        const heroiComID = {
            id, 
            ...heroi
        };

        const dadosFinal = [
            ...dados,
            heroiComID
        ];

        const resultado = this.escreverArquivo(dadosFinal);

        return resultado;
    }

} //closing class


module.exports = new Database();